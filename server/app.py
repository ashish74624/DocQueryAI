import os
import uuid
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import Base, engine, get_db
from models import Document, ChatSession, Message
from schemas import SessionCreate, AskRequest
from datetime import datetime
from ingest import ingest_pdf
from models import User
from schemas import (
    RegisterSchema,
    LoginSchema,
    SessionRename
)
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)
from graph import graph
from storage import upload_pdf
from llm import generate_session_title

Base.metadata.create_all(bind=engine)

# os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "DocuQuery API Running"}


@app.post("/register")
def register(
    payload: RegisterSchema,
    db: Session = Depends(get_db)
):
    existing = db.query(User).filter(
        User.email == payload.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    user = User(
        name=payload.name,
        email=payload.email,
        hashed_password=hash_password(
            payload.password
        )
    )

    db.add(user)
    db.commit()

    return {
        "message":
        "Registered successfully"
    }


@app.post("/login")
def login(
    payload: LoginSchema,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.email == payload.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    valid = verify_password(
        payload.password,
        user.hashed_password
    )

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "user_id":
            user.id
        }
    )

    return {
        "access_token":
        token,
        "token_type":
        "bearer",
        "name":
        user.name
    }

@app.get("/me")
def me(
    user = Depends(
        get_current_user
    )
):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }

# --------------------
# Upload PDF
# --------------------
@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    doc_id = str(uuid.uuid4())

    temp_path = f"temp_{doc_id}.pdf"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    # upload to B2
    key = f"user_{user.id}/{doc_id}_{file.filename}"
    url = upload_pdf(temp_path, key)

    # ingest to qdrant
    ingest_pdf(
        temp_path,
        doc_id,
        file.filename,
        user.id
    )

    # delete temp file
    os.remove(temp_path)

    doc = Document(
        user_id=user.id,
        doc_id=doc_id,
        filename=file.filename,
        file_key=key,
        file_url=url
    )

    db.add(doc)
    db.commit()

    return {
        "message": "Uploaded",
        "url": url
    }

# --------------------
# Documents
# --------------------
@app.get("/documents")
def get_documents(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    docs = db.query(Document).filter(
        Document.user_id == user.id
    ).all()

    return docs


# --------------------
# Sessions
# --------------------
@app.post("/sessions")
def create_session(
    payload: SessionCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    session = ChatSession(
        user_id=user.id,
        title=payload.title
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session


@app.get("/sessions")
def get_sessions(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    sessions = db.query(ChatSession).filter(
        ChatSession.user_id == user.id
    ).order_by(ChatSession.updated_at.desc()).all()

    return sessions


@app.get("/sessions/{session_id}/messages")
def get_messages(
    session_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == user.id
    ).first()

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found"
        )

    msgs = db.query(Message).filter(
        Message.session_id == session_id
    ).all()

    return msgs

@app.put("/sessions/{session_id}")
def rename_session(
    session_id: int,
    payload: SessionCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == user.id
    ).first()

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    session.title = payload.title
    db.commit()

    return session

@app.put("/sessions/{session_id}")
def rename_session(
    session_id: int,
    payload: SessionRename,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == user.id
    ).first()

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    title = payload.title.strip()

    if not title:
        raise HTTPException(status_code=400, detail="Title cannot be empty")

    if len(title) > 100:
        raise HTTPException(status_code=400, detail="Title too long")

    session.title = title

    db.commit()
    db.refresh(session)

    return session

from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.responses import Response
from datetime import datetime

@app.post("/report")
async def generate_report(
    topic: str = Body(..., embed=True),
    session_id: int = Body(..., embed=True),
    user=Depends(get_current_user),
):
    """
    Runs the graph in tool mode with tool_name='research_report'.
    Returns the PDF as a file download.
    """
    state = {
        "question": topic,
        "mode": "tool",
        "tool_name": "research_report",
        "selected_docs": [],
        "user_id": user.id,
        "docs": [],
        "answer": "",
        "route": "",
        "sources": [],
        "meta": {},
        "memory": [],
        "report_pdf": None,
    }

    result = graph.invoke(state)

    pdf_bytes = result.get("report_pdf")
    if not pdf_bytes:
        raise HTTPException(status_code=500, detail="Report generation failed.")

    safe_topic = topic[:40].replace(" ", "_").replace("/", "-")

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="report_{safe_topic}.pdf"'
        },
    )

 
@app.post("/ask")
def ask(
    payload: AskRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    session = db.query(ChatSession).filter(
        ChatSession.id == payload.session_id,
        ChatSession.user_id == user.id,
    ).first()
 
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
 
    user_msg = Message(
        session_id=payload.session_id,
        role="user",
        content=payload.question,
    )
    db.add(user_msg)
    db.commit()
 
    DEFAULT_TITLE = "New Chat"
    if session.title in [None, "", DEFAULT_TITLE]:
        title = generate_session_title(payload.question)
        session.title = title
        db.commit()
 
    history = (
        db.query(Message)
        .filter(Message.session_id == payload.session_id)
        .order_by(Message.id.asc())
        .all()
    )
    memory = [f"{m.role}: {m.content}" for m in history[-10:]]
 
    result = graph.invoke({
        "question": payload.question,
        "mode": payload.mode,
        "selected_docs": payload.selected_docs,
        "user_id": user.id,
        "tool_name": payload.tool_name or "",   # ← added
        "docs": [],
        "answer": "",
        "route": "",
        "sources": [],
        "meta": {},
        "memory": memory,
        "report_pdf": None,                     # ← added
    })
 
    bot_msg = Message(
        session_id=payload.session_id,
        role="assistant",
        content=result["answer"],
    )
    session.updated_at = datetime.utcnow()
    db.add(bot_msg)
    db.commit()
 
    return {
        "answer": result["answer"],
        "sources": result["sources"],
        "meta": result["meta"],
    }
 
 
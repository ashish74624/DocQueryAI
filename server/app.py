import os
import uuid
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import Base, engine, get_db
from models import Document, ChatSession, Message
from schemas import SessionCreate, AskRequest
from config import UPLOAD_DIR
from ingest import ingest_pdf
from models import User
from schemas import (
    RegisterSchema,
    LoginSchema
)
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)
from graph import graph

Base.metadata.create_all(bind=engine)

os.makedirs(UPLOAD_DIR, exist_ok=True)

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

    path = os.path.join(
        UPLOAD_DIR,
        f"{doc_id}_{file.filename}"
    )

    with open(path, "wb") as f:
        f.write(await file.read())

    ingest_pdf(
        path,
        doc_id,
        file.filename
    )

    doc = Document(
        user_id=user.id,
        doc_id=doc_id,
        filename=file.filename
    )

    db.add(doc)
    db.commit()

    return {
        "message": "Uploaded"
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
    ).all()

    return sessions

# --------------------
# Messages by session
# --------------------
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


# --------------------
# Ask
# --------------------
@app.post("/ask")
def ask(
    payload: AskRequest,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    session = db.query(ChatSession).filter(
        ChatSession.id == payload.session_id,
        ChatSession.user_id == user.id
    ).first()

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found"
        )

    user_msg = Message(
        session_id=payload.session_id,
        role="user",
        content=payload.question
    )

    db.add(user_msg)
    db.commit()

    history = db.query(Message).filter(
        Message.session_id == payload.session_id
    ).order_by(Message.id.asc()).all()

    memory = [
        f"{m.role}: {m.content}"
        for m in history[-10:]
    ]

    result = graph.invoke({
    "question": payload.question,
    "mode": payload.mode,
    "selected_docs": payload.selected_docs,

    "docs": [],
    "answer": "",
    "route": "",
    "sources": [],
    "meta": {},

    "memory": memory
})

    bot_msg = Message(
        session_id=payload.session_id,
        role="assistant",
        content=result["answer"]
    )

    db.add(bot_msg)
    db.commit()

    return {
        "answer": result["answer"],
        "sources": result["sources"],
        "meta": result["meta"]
    }
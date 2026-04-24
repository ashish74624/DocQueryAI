import os
import uuid

from fastapi import FastAPI, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from db import Base, engine, get_db
from models import Document, ChatSession, Message
from schemas import SessionCreate, AskRequest

from config import UPLOAD_DIR
from ingest import ingest_pdf
from retriever import retrieve_docs
from llm import generate_answer

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


# --------------------
# Upload PDF
# --------------------
@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
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
        doc_id=doc_id,
        filename=file.filename
    )

    db.add(doc)
    db.commit()

    return {
        "doc_id": doc_id,
        "filename": file.filename
    }


# --------------------
# Documents
# --------------------
@app.get("/documents")
def get_documents(
    db: Session = Depends(get_db)
):
    docs = db.query(Document).all()

    return docs


# --------------------
# Sessions
# --------------------
@app.post("/sessions")
def create_session(
    payload: SessionCreate,
    db: Session = Depends(get_db)
):
    session = ChatSession(
        title=payload.title
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session


@app.get("/sessions")
def get_sessions(
    db: Session = Depends(get_db)
):
    return db.query(ChatSession).all()


# --------------------
# Messages by session
# --------------------
@app.get("/sessions/{session_id}/messages")
def get_messages(
    session_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Message).filter(
        Message.session_id == session_id
    ).all()


# --------------------
# Ask
# --------------------
@app.post("/ask")
def ask(
    payload: AskRequest,
    db: Session = Depends(get_db)
):
    user_msg = Message(
        session_id=payload.session_id,
        role="user",
        content=payload.question
    )

    db.add(user_msg)
    db.commit()

    docs = retrieve_docs(
        payload.question,
        payload.mode,
        payload.selected_docs
    )

    answer = generate_answer(
        payload.question,
        docs
    )

    bot_msg = Message(
        session_id=payload.session_id,
        role="assistant",
        content=answer
    )

    db.add(bot_msg)
    db.commit()

    sources = []

    for d in docs:
        sources.append({
            "filename": d.metadata["filename"],
            "page": d.metadata.get("page", 1),
            "snippet": d.page_content[:220]
        })

    return {
        "answer": answer,
        "sources": sources
    }
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from db import get_db
from models import ChatSession, Message
from auth import get_current_user
from schemas import AskRequest
from graph import graph
from llm import generate_session_title

router = APIRouter()

@router.post("/ask")
def ask(payload: AskRequest, db: Session = Depends(get_db), user=Depends(get_current_user)):
    session = db.query(ChatSession).filter(
        ChatSession.id == payload.session_id,
        ChatSession.user_id == user.id,
    ).first()

    if not session:
        raise HTTPException(404, "Session not found")

    db.add(Message(session_id=payload.session_id, role="user", content=payload.question))
    db.commit()

    if session.title in [None, "", "New Chat"]:
        session.title = generate_session_title(payload.question)
        db.commit()

    history = db.query(Message).filter(
        Message.session_id == payload.session_id
    ).order_by(Message.id.asc()).all()

    memory = [f"{m.role}: {m.content}" for m in history[-10:]]

    result = graph.invoke({
        "question": payload.question,
        "mode": payload.mode,
        "selected_docs": payload.selected_docs,
        "user_id": user.id,
        "tool_name": payload.tool_name or "",
        "docs": [],
        "answer": "",
        "route": "",
        "sources": [],
        "meta": {},
        "memory": memory,
        "report_pdf": None,
    })

    db.add(Message(session_id=payload.session_id, role="assistant", content=result["answer"]))
    session.updated_at = datetime.utcnow()

    db.commit()

    return {
        "answer": result["answer"],
        "sources": result["sources"],
        "meta": result["meta"],
    }
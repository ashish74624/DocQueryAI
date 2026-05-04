from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import get_db
from models import ChatSession, Message
from auth import get_current_user
from schemas import SessionCreate, SessionRename

router = APIRouter()

@router.post("/sessions")
def create_session(payload: SessionCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    session = ChatSession(user_id=user.id, title=payload.title)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.get("/sessions")
def get_sessions(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(ChatSession).filter(
        ChatSession.user_id == user.id
    ).order_by(ChatSession.updated_at.desc()).all()


@router.get("/sessions/{session_id}/messages")
def get_messages(session_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == user.id
    ).first()

    if not session:
        raise HTTPException(404, "Session not found")

    return db.query(Message).filter(Message.session_id == session_id).all()


@router.put("/sessions/{session_id}")
def rename_session(
    session_id: int,
    payload: SessionRename,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == user.id
    ).first()

    if not session:
        raise HTTPException(404, "Session not found")

    title = payload.title.strip()

    if not title:
        raise HTTPException(400, "Title cannot be empty")

    if len(title) > 100:
        raise HTTPException(400, "Title too long")

    session.title = title
    db.commit()
    db.refresh(session)

    return session
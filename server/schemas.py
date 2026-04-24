from pydantic import BaseModel


class SessionCreate(BaseModel):
    title: str


class AskRequest(BaseModel):
    session_id: int
    question: str
    mode: str
    selected_docs: list[str]
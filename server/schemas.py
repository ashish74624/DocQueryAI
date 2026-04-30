from pydantic import BaseModel, EmailStr


class SessionCreate(BaseModel):
    title: str


class AskRequest(BaseModel):
    session_id: int
    question: str
    mode: str   # chat | rag | tool
    selected_docs: list[str]



class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginSchema(BaseModel):
    email: EmailStr
    password: str
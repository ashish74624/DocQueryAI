from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine
from routes import auth, users, documents, sessions, chat, tools
from models import *  

Base.metadata.create_all(bind=engine)

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

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(documents.router)
app.include_router(sessions.router)
app.include_router(chat.router)
app.include_router(tools.router)
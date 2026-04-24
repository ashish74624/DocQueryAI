import os
import uuid

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import UPLOAD_DIR
from ingest import ingest_pdf
from retriever import retrieve_docs
from llm import generate_answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(UPLOAD_DIR, exist_ok=True)


class AskRequest(BaseModel):
    question: str
    mode: str
    selected_docs: list[str]


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    doc_id = str(uuid.uuid4())

    path = os.path.join(
        UPLOAD_DIR,
        f"{doc_id}_{file.filename}"
    )

    with open(path, "wb") as f:
        f.write(await file.read())

    result = ingest_pdf(
        path,
        doc_id,
        file.filename
    )

    return {
        "doc_id": doc_id,
        "filename": file.filename,
        "details": result
    }


@app.post("/ask")
def ask(payload: AskRequest):
    docs = retrieve_docs(
        payload.mode,
        payload.selected_docs,
        payload.question
    )

    answer = generate_answer(
        payload.question,
        docs
    )

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
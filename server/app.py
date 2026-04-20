import os
import uuid
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from ingest import ingest_pdf
from config import UPLOAD_DIR
from pydantic import BaseModel

from retriever import retrieve_chunks
from llm import generate_answer


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
os.makedirs("vectorstores", exist_ok=True)


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files supported"}

    doc_id = str(uuid.uuid4())

    file_path = os.path.join(
        UPLOAD_DIR,
        f"{doc_id}_{file.filename}"
    )

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    result = ingest_pdf(file_path, doc_id)

    return {
        "message": "Upload successful",
        "doc_id": doc_id,
        "details": result
    }



class AskRequest(BaseModel):
    doc_id: str
    question: str


@app.post("/ask")
def ask_question(payload: AskRequest):
    docs = retrieve_chunks(
        payload.doc_id,
        payload.question
    )

    answer = generate_answer(
        payload.question,
        docs
    )

    sources = []

    for doc in docs:
        sources.append({
            "page": doc.metadata.get("page"),
            "snippet": doc.page_content[:250]
        })

    return {
        "answer": answer,
        "sources": sources
    }
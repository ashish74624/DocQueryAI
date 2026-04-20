import os
import uuid
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from ingest import ingest_pdf
from config import UPLOAD_DIR

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
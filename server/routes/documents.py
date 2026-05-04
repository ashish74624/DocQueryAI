import os, uuid
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from db import get_db
from models import Document
from auth import get_current_user
from ingest import ingest_pdf
from storage import upload_pdf

router = APIRouter()

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    doc_id = str(uuid.uuid4())
    temp_path = f"temp_{doc_id}.pdf"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    key = f"user_{user.id}/{doc_id}_{file.filename}"
    url = upload_pdf(temp_path, key)

    ingest_pdf(temp_path, doc_id, file.filename, user.id)

    os.remove(temp_path)

    doc = Document(
        user_id=user.id,
        doc_id=doc_id,
        filename=file.filename,
        file_key=key,
        file_url=url
    )

    db.add(doc)
    db.commit()

    return {"message": "Uploaded", "url": url}


@router.get("/documents")
def get_documents(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return db.query(Document).filter(Document.user_id == user.id).all()
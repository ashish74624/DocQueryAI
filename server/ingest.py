import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_classic.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    EMBEDDING_MODEL,
    VECTOR_DB_DIR
)


def ingest_pdf(file_path: str, doc_id: str, filename: str):
    loader = PyPDFLoader(file_path)
    docs = loader.load()

    for doc in docs:
        doc.metadata["doc_id"] = doc_id
        doc.metadata["filename"] = filename

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP
    )

    chunks = splitter.split_documents(docs)

    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    if os.path.exists(VECTOR_DB_DIR):
        db = FAISS.load_local(
            VECTOR_DB_DIR,
            embeddings,
            allow_dangerous_deserialization=True
        )

        db.add_documents(chunks)
    else:
        db = FAISS.from_documents(
            chunks,
            embeddings
        )

    db.save_local(VECTOR_DB_DIR)

    return {
        "pages": len(docs),
        "chunks": len(chunks)
    }
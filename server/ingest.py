import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_classic.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    VECTOR_DB_DIR,
    EMBEDDING_MODEL
)


def ingest_pdf(file_path: str, doc_id: str):
    # 1. Load PDF
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    # 2. Add metadata
    for doc in documents:
        doc.metadata["doc_id"] = doc_id

    # 3. Chunk text
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP
    )

    chunks = splitter.split_documents(documents)

    # 4. Embeddings
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    # 5. Create FAISS Index
    vectorstore = FAISS.from_documents(chunks, embeddings)

    # 6. Save locally
    save_path = os.path.join(VECTOR_DB_DIR, doc_id)
    vectorstore.save_local(save_path)

    return {
        "pages": len(documents),
        "chunks": len(chunks),
        "saved_to": save_path
    }
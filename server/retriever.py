from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

from config import (
    VECTOR_DB_DIR,
    EMBEDDING_MODEL,
    TOP_K
)


def load_db():
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    db = FAISS.load_local(
        VECTOR_DB_DIR,
        embeddings,
        allow_dangerous_deserialization=True
    )

    return db


def retrieve_docs(mode, selected_docs, question):
    db = load_db()

    docs = db.similarity_search(
        question,
        k=TOP_K
    )

    if mode == "selected":
        docs = [
            d for d in docs
            if d.metadata["doc_id"] in selected_docs
        ]

    return docs
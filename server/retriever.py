import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from config import VECTOR_DB_DIR, EMBEDDING_MODEL, TOP_K


def load_vectorstore(doc_id):
    path = os.path.join(VECTOR_DB_DIR, doc_id)

    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    db = FAISS.load_local(
        path,
        embeddings,
        allow_dangerous_deserialization=True
    )

    return db


def retrieve_chunks(doc_id, query):
    db = load_vectorstore(doc_id)

    docs = db.similarity_search(query, k=TOP_K)

    return docs
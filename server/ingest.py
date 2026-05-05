from langchain_community.document_loaders import PyPDFLoader
from langchain_classic.text_splitter import RecursiveCharacterTextSplitter
# CHANGED: Swapped to Endpoint version to save 500MB+ RAM
from langchain_huggingface import HuggingFaceEndpointEmbeddings

from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from langchain_qdrant import QdrantVectorStore
import os # Added to fetch API token

from config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    EMBEDDING_MODEL,
    QDRANT_URL,
    QDRANT_API_KEY,
    QDRANT_COLLECTION,
    HUGGINGFACEHUB_API_TOKEN
)

def ingest_pdf(
    file_path: str,
    doc_id: str,
    filename: str,
    user_id: int
):
    loader = PyPDFLoader(file_path)
    docs = loader.load()

    for doc in docs:
        doc.metadata["doc_id"] = doc_id
        doc.metadata["filename"] = filename
        doc.metadata["user_id"] = user_id

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP
    )

    chunks = splitter.split_documents(docs)

    # CHANGED: Using API call to generate vectors
    embeddings = HuggingFaceEndpointEmbeddings(
        model=EMBEDDING_MODEL,
        huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN
    )

    client = QdrantClient(
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY
    )

    collections = [
        c.name for c in client.get_collections().collections
    ]

    if QDRANT_COLLECTION not in collections:
        client.create_collection(
            collection_name=QDRANT_COLLECTION,
            vectors_config=VectorParams(
                size=384, # Ensure this matches your EMBEDDING_MODEL dimensions
                distance=Distance.COSINE
            )
        )

    try:
        client.create_payload_index(
            collection_name=QDRANT_COLLECTION,
            field_name="metadata.user_id",
            field_schema="integer"
        )
    except:
        pass

    try:
        client.create_payload_index(
            collection_name=QDRANT_COLLECTION,
            field_name="metadata.doc_id",
            field_schema="keyword"
        )
    except:
        pass

    store = QdrantVectorStore(
        client=client,
        collection_name=QDRANT_COLLECTION,
        embedding=embeddings
    )

    store.add_documents(chunks)

    return {
        "pages": len(docs),
        "chunks": len(chunks)
    }
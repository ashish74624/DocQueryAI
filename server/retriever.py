from langchain_huggingface import HuggingFaceEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchAny, MatchValue

from config import (
    EMBEDDING_MODEL,
    TOP_K,
    QDRANT_URL,
    QDRANT_API_KEY,
    QDRANT_COLLECTION
)


def retrieve_docs(
    question,
    mode,
    selected_docs,
    user_id
):
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL
    )

    client = QdrantClient(
        url=QDRANT_URL,
        api_key=QDRANT_API_KEY
    )

    store = QdrantVectorStore(
        client=client,
        collection_name=QDRANT_COLLECTION,
        embedding=embeddings
    )

    must_conditions = [
        FieldCondition(
            key="metadata.user_id",
            match=MatchValue(value=user_id)
        )
    ]

    if mode == "selected" and selected_docs:
        must_conditions.append(
            FieldCondition(
                key="metadata.doc_id",
                match=MatchAny(
                    any=selected_docs
                )
            )
        )

    docs = store.similarity_search(
        question,
        k=TOP_K,
        filter=Filter(
            must=must_conditions
        )
    )

    return docs
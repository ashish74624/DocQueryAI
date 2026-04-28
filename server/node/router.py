from retriever import retrieve_docs
from llm import route_question


def router_node(state):
    # try retrieval first
    docs = retrieve_docs(
        state["question"],
        state["mode"],
        state["selected_docs"]
    )

    if docs and len(docs) > 0:
        return {
            "route": "rag",
            "docs": docs
        }

    # fallback to model router
    route = route_question(
        state["question"]
    )

    return {
        "route": route,
        "docs": []
    }
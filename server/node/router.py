from retriever import retrieve_docs
from llm import route_question


def router_node(state):
    docs = retrieve_docs(
        state["question"],
        state["mode"],
        state["selected_docs"],
        state["user_id"]
    )

    if docs and len(docs) > 0:
        return {
            "route": "rag",
            "docs": docs
        }

    route = route_question(
        state["question"]
    )

    return {
        "route": route,
        "docs": []
    }
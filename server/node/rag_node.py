from retriever import retrieve_docs
from llm import generate_rag_answer


def rag_node(state):
    docs = retrieve_docs(
        state["question"],
        "selected",
        state["selected_docs"],
        state["user_id"]
    )

    answer = generate_rag_answer(
        state["question"],
        docs
    )

    return {
        "answer": answer,
        "docs": docs,
        "meta": {
            "used_docs": True,
            "used_model_knowledge": False,
            "tools_used": []
        }
    }
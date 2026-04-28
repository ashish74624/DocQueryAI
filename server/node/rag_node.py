from retriever import retrieve_docs
from llm import generate_rag_answer


def rag_node(state):
    docs = retrieve_docs(
        state["question"],
        state["mode"],
        state["selected_docs"]
    )

    answer = generate_rag_answer(
        state["question"],
        docs
    )

    return {
        "docs": docs,
        "answer": answer,
        "meta": {
            "used_docs": True,
            "used_model_knowledge": False,
            "tools_used": []
        }
    }
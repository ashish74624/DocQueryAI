from llm import generate_with_memory


def llm_node(state):
    answer = generate_with_memory(
        state["question"],
        state["memory"]
    )

    return {
        "answer": answer,
        "docs": [],
        "meta": {
            "used_docs": False,
            "used_model_knowledge": True,
            "tools_used": []
        }
    }
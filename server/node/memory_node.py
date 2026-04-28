def memory_node(state):
    memory = state["memory"]

    memory.append(
        f"user: {state['question']}"
    )

    memory.append(
        f"assistant: {state['answer']}"
    )

    return {
        "memory": memory[-12:]
    }
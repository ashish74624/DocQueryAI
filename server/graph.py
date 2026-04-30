from langgraph.graph import StateGraph, END

from state import GraphState

from node.chat_node import chat_node
from node.rag_node import rag_node
from node.tool_node import tool_node
from node.memory_node import memory_node
from node.finalize import finalize_node


builder = StateGraph(GraphState)

builder.add_node("chat", chat_node)
builder.add_node("rag", rag_node)
builder.add_node("tool", tool_node)
builder.add_node("memory", memory_node)
builder.add_node("finalize", finalize_node)


def route_mode(state):
    return state["mode"]


builder.set_conditional_entry_point(
    route_mode,
    {
        "chat": "chat",
        "rag": "rag",
        "tool": "tool"
    }
)

builder.add_edge("chat", "memory")
builder.add_edge("rag", "memory")
builder.add_edge("tool", "memory")

builder.add_edge("memory", "finalize")
builder.add_edge("finalize", END)

graph = builder.compile()
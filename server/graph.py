from langgraph.graph import StateGraph, END

from state import GraphState

from node.router import router_node
from node.rag_node import rag_node
from node.llm_node import llm_node
from node.weather_node import weather_node
from node.memory_node import memory_node
from node.finalize import finalize_node


builder = StateGraph(GraphState)

builder.add_node("router", router_node)
builder.add_node("rag", rag_node)
builder.add_node("llm", llm_node)
builder.add_node("weather", weather_node)
builder.add_node("memory", memory_node)
builder.add_node("finalize", finalize_node)

builder.set_entry_point("router")


def route_logic(state):
    return state["route"]


builder.add_conditional_edges(
    "router",
    route_logic,
    {
        "rag": "rag",
        "weather": "weather",
        "llm": "llm"
    }
)

builder.add_edge("rag", "memory")
builder.add_edge("weather", "memory")
builder.add_edge("llm", "memory")

builder.add_edge("memory", "finalize")
builder.add_edge("finalize", END)

graph = builder.compile()
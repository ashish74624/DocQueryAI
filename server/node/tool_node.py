from tools.tool_registry import TOOL_REGISTRY
from llm import generate_with_memory


def tool_node(state):
    tool_name = state.get("tool_name", "").strip()
    question = state["question"]

    # ── known tool ──────────────────────────────────────────────────────────
    if tool_name in TOOL_REGISTRY:
        tool_fn = TOOL_REGISTRY[tool_name]

        try:
            result = tool_fn(question)
        except Exception as e:
            return {
                "answer": f"Tool '{tool_name}' encountered an error: {str(e)}",
                "docs": [],
                "report_pdf": None,
                "meta": {
                    "used_docs": False,
                    "used_model_knowledge": False,
                    "tools_used": [tool_name],
                    "error": str(e),
                },
            }

        # research_report returns raw PDF bytes — store separately
        if tool_name == "research_report":
            return {
                "answer": "Report generated successfully.",
                "docs": [],
                "report_pdf": result,          # bytes
                "meta": {
                    "used_docs": False,
                    "used_model_knowledge": False,
                    "tools_used": ["research_report"],
                },
            }

        # all other tools return a plain string answer
        return {
            "answer": result,
            "docs": [],
            "report_pdf": None,
            "meta": {
                "used_docs": False,
                "used_model_knowledge": False,
                "tools_used": [tool_name],
            },
        }

    # ── unknown tool → fall back to LLM ─────────────────────────────────────
    answer = generate_with_memory(question, state.get("memory", []))
    return {
        "answer": answer,
        "docs": [],
        "report_pdf": None,
        "meta": {
            "used_docs": False,
            "used_model_knowledge": True,
            "tools_used": [],
        },
    }
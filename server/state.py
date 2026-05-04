from typing import TypedDict, List, Any, Optional


class GraphState(TypedDict):
    question: str
    mode: str
    selected_docs: list[str]
    user_id: int
    docs: List[Any]
    answer: str
    route: str

    sources: list
    meta: dict
    memory: list

    # Tool dispatch
    tool_name: Optional[str]       # e.g. "weather" | "research_report"

    # Populated by research_report tool only
    report_pdf: Optional[bytes]
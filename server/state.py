from typing import TypedDict, List, Any


class GraphState(TypedDict):
    question: str
    mode: str
    selected_docs: list[str]

    docs: List[Any]
    answer: str
    route: str

    sources: list
    meta: dict

    memory: list
from tools.weather import get_weather
from llm import generate_with_memory


def tool_node(state):
    q = state["question"].lower()

    if "weather" in q:
        city = q.replace("weather in", "").strip()
        answer = get_weather(city)

        meta = {
            "used_docs": False,
            "used_model_knowledge": False,
            "tools_used": ["weather_api"]
        }

    else:
        answer = generate_with_memory(
            state["question"],
            state["memory"]
        )

        meta = {
            "used_docs": False,
            "used_model_knowledge": True,
            "tools_used": []
        }

    return {
        "answer": answer,
        "docs": [],
        "meta": meta
    }
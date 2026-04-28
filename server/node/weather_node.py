from tools.weather import get_weather
from llm import run_llm


def extract_city(question: str):
    prompt = f"""
Extract only the city name from this weather question.

Examples:
Weather in Delhi tomorrow -> Delhi
What's weather in Tokyo -> Tokyo

Return only city name.

Question:
{question}
"""

    return run_llm(prompt).strip()


def weather_node(state):
    question = state["question"]

    city = extract_city(question)

    weather = get_weather(city)

    return {
        "answer": weather,
        "docs": [],
        "meta": {
            "used_docs": False,
            "used_model_knowledge": False,
            "tools_used": ["weather_api"]
        }
    }
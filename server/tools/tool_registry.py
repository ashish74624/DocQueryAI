from tools.weather import get_weather
from tools.research_report import generate_research_report

# Registry maps tool_name → callable
# Each callable receives a single `topic/query` string and returns a string answer
# (except research_report which returns bytes — handled specially in tool_node)

TOOL_REGISTRY = {
    "weather": get_weather,
    "research_report": generate_research_report,
}
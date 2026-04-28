import requests
from config import WEATHER_API_KEY


def get_weather(city: str):
    try:
        url = (
            f"https://api.weatherapi.com/v1/current.json"
            f"?key={WEATHER_API_KEY}"
            f"&q={city}"
            f"&aqi=no"
        )

        res = requests.get(
            url,
            timeout=5
        )

        data = res.json()

        if res.status_code != 200:
            return f"Could not fetch weather for {city}"

        return (
            f"Weather in {data['location']['name']}: "
            f"{data['current']['temp_c']}°C, "
            f"{data['current']['condition']['text']}."
        )

    except Exception as e:
        return f"Weather service failed: {str(e)}"
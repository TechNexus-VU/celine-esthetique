# config.py
# Talha's shared config — imported by nail_design.py
# Do NOT edit this unless you change your API key
 
from openai import AsyncOpenAI
from dotenv import load_dotenv
import os
 
load_dotenv()

_api_key = os.getenv("OPENAI_API_KEY")

if not _api_key or _api_key == "sk-your-key-here":
    raise RuntimeError(
        "OPENAI_API_KEY is missing or still set to the placeholder. "
        "Please add your real API key to the .env file."
    )

client = AsyncOpenAI(api_key=_api_key)
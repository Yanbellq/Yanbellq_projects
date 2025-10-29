
import requests
from decouple import config

DEEPL_URL = "https://api-free.deepl.com/v2/translate"
DEEPL_AUTH_KEY = config("DEEPL_AUTH_KEY")

def translate_text(text, target_lang, source_lang=None):
    payload = {
        "auth_key": DEEPL_AUTH_KEY,
        "text": text,
        "target_lang": target_lang.upper()
    }
    if source_lang:
        payload["source_lang"] = source_lang.upper()

    response = requests.post(DEEPL_URL, data=payload)
    result = response.json()

    return result["translations"][0]["text"]

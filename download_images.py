import ssl
import urllib.request
from duckduckgo_search import DDGS
import json

ssl._create_default_https_context = ssl._create_unverified_context

foods = {
    "vadapav": "vada pav indian street food",
    "samosa": "punjabi samosa indian food",
    "paneertikka": "paneer tikka appetizer indian food",
    "dosa": "masala dosa south indian food",
    "cholebhature": "chole bhature indian food",
    "biryani": "hyderabadi biryani indian food",
    "gulabjamun": "gulab jamun indian dessert",
    "mangolassi": "mango lassi indian drink",
    "masalachai": "masala chai indian tea",
    "jalebi": "jalebi indian sweet"
}

ddgs = DDGS()

for filename, query in foods.items():
    print(f"Searching for {query}...")
    try:
        results = ddgs.images(query, max_results=1)
        if results:
            image_url = results[0]['image']
            print(f"Downloading {image_url}")
            
            # Download with spoofed user agent
            req = urllib.request.Request(
                image_url, 
                headers={'User-Agent': 'Mozilla/5.0'}
            )
            with urllib.request.urlopen(req, timeout=10) as response, open(f"frontend/public/{filename}.jpg", 'wb') as out_file:
                out_file.write(response.read())
            print(f"Saved {filename}.jpg")
    except Exception as e:
        print(f"Failed for {filename}: {e}")

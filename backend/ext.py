import requests
from bs4 import BeautifulSoup
chapter = input("Enter Chapter: ")
verse = input("Enter Verse: ")
url = f"https://www.holy-bhagavad-gita.org/chapter/{chapter}/verse/{verse}/hi"
headers = {"User-Agent": "Mozilla/5.0"}  # Prevent blocking

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

# Extract text using CSS selector
element = soup.select_one("#translation > p")

if element:
    print("Extracted Text:", element.text)
else:
    print("❌ Element not found!")


import asyncio
import httpx
from bs4 import BeautifulSoup
import random

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15"
]

def clean_html(html_content: str) -> str:
    """Removes junk HTML and extracts clean text."""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove junk elements
    for element in soup(["script", "style", "nav", "footer", "header", "noscript", "iframe", "aside"]):
        element.extract()
        
    text = soup.get_text(separator=' ', strip=True)
    # Remove extra whitespaces
    text = ' '.join(text.split())
    return text[:2000] # Limit to 2000 chars for Gemini context window

async def scrape_job_page_async(url: str, retries: int = 2) -> dict:
    """
    Async scrape job page with User-Agent rotation and retries.
    """
    for attempt in range(retries):
        headers = {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
        }
        
        try:
            async with httpx.AsyncClient(timeout=15.0, follow_redirects=True) as client:
                response = await client.get(url, headers=headers)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Title extraction improvements
                title_tag = soup.find('h1') or soup.find('h2', class_=lambda c: c and 'title' in c.lower())
                title = title_tag.get_text(strip=True) if title_tag else soup.title.string if soup.title else "Unknown Title"
                
                description = clean_html(response.text)
                
                if not description:
                    raise ValueError("Empty description extracted")
                    
                return {
                    "title": title,
                    "company": "See URL", # Extracting company generically is error-prone, better to use AI or URL
                    "description": description,
                    "url": url
                }
        except Exception as e:
            print(f"Scrape attempt {attempt+1} failed for {url}: {e}")
            if attempt < retries - 1:
                await asyncio.sleep(random.uniform(1.0, 2.5)) # Random delay before retry
            
    return {
        "title": "Error Scraping",
        "company": "Unknown",
        "description": "",
        "url": url
    }

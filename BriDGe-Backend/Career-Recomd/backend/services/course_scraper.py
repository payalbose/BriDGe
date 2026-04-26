import asyncio
from typing import List
import re
import urllib.request
import urllib.parse
from playwright.async_api import async_playwright
import csv
import os

from models.schemas import Course
from bs4 import BeautifulSoup

CSV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "courses.csv")

async def scrape_youtube_playwright(skill: str) -> List[Course]:
    """
    Uses Playwright to synchronously scrape YouTube for free course recommendations.
    Provides highly accurate data mimicking a real user search.
    """
    query = urllib.parse.quote(f"{skill} full course tutorial")
    url = f"https://www.youtube.com/results?search_query={query}"
    courses = []
    
    try:
        async with async_playwright() as p:
            # Launch chromium headlessly
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(url, timeout=15000)
            
            # Wait for video renderer elements
            await page.wait_for_selector('ytd-video-renderer', timeout=5000)
            
            elements = await page.query_selector_all('ytd-video-renderer')
            for el in elements[:2]:  # Limit to Top 2 strictly
                title_el = await el.query_selector('#video-title')
                if title_el:
                    title = await title_el.get_attribute('title')
                    href = await title_el.get_attribute('href')
                    if title and href:
                        link = f"https://www.youtube.com{href}"
                        courses.append(Course(title=title, link=link, platform="YouTube"))
            await browser.close()
    except Exception as e:
        print(f"Playwright scrape failed for '{skill}': {e}. Triggering fallback.")
        courses = await fallback_youtube_scrape(skill)
        
    return courses

def fetch_url_sync(req):
    return urllib.request.urlopen(req, timeout=10).read().decode('utf-8')

async def fallback_youtube_scrape(skill: str) -> List[Course]:
    """
    Fallback mechanism using standard urllib and Regex directly on the HTML.
    Prevents the workflow from failing when Playwright breaks.
    """
    courses = []
    query = urllib.parse.quote(f"{skill} full course")
    url = f"https://www.youtube.com/results?search_query={query}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = await asyncio.to_thread(fetch_url_sync, req)
        video_ids = re.findall(r"watch\?v=(\S{11})", html)
        seen = set()
        
        for vid in video_ids:
            if vid not in seen:
                seen.add(vid)
                courses.append(Course(
                    title=f"Learn {skill.title()} Base Tutorial", 
                    link=f"https://www.youtube.com/watch?v={vid}", 
                    platform="YouTube"
                ))
            if len(courses) >= 2:
                break
    except Exception as e:
        print(f"Fallback scrape also failed: {e}")
    return courses

def get_fallback_courses(skill: str) -> List[Course]:
    """ Reads from a local robust dataset when live scraping fails entirely. """
    courses = []
    if os.path.exists(CSV_PATH):
        with open(CSV_PATH, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if skill.lower() in row['skill'].lower():
                    courses.append(Course(
                        title=row['title'],
                        link=row['link'],
                        platform=row['platform']
                    ))
    return courses[:2]

async def scrape_coursera_basic(skill: str) -> List[Course]:
    """
    Basic scraper for Coursera using BeautifulSoup.
    """
    courses = []
    query = urllib.parse.quote(skill)
    url = f"https://www.coursera.org/search?query={query}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = await asyncio.to_thread(fetch_url_sync, req)
        soup = BeautifulSoup(html, 'html.parser')
        
        # Coursera often changes classes, we look for basic link structures
        links = soup.find_all('a', href=re.compile(r'^/learn/'))
        seen = set()
        
        for link in links:
            href = link.get('href')
            if href and href not in seen:
                seen.add(href)
                # Try to extract a title from the link or text
                title = link.get_text(strip=True) or f"{skill.title()} Course"
                if len(title) > 5:
                    courses.append(Course(
                        title=title,
                        link=f"https://www.coursera.org{href}",
                        platform="Coursera"
                    ))
            if len(courses) >= 1: # just get top 1 for variety
                break
    except Exception as e:
        print(f"Coursera scrape failed for '{skill}': {e}")
    return courses

async def _scrape_for_single_skill(skill: str) -> List[Course]:
    # Use fallback directly for immediate results without Playwright overhead
    course_list = await fallback_youtube_scrape(skill)
    
    # Try Coursera (fast enough with urllib)
    coursera_list = await scrape_coursera_basic(skill)
    course_list.extend(coursera_list)
    
    if not course_list:
        course_list = get_fallback_courses(skill)
    return course_list

async def get_courses_for_skills(skills: List[str]) -> List[Course]:
    """ Main interface: fetches courses for top critical missing skills concurrently. """
    all_courses = []
    
    # Scraping takes time; limit to top 2 critical skills and run concurrently
    tasks = [_scrape_for_single_skill(skill) for skill in skills[:2]]
    results = await asyncio.gather(*tasks)
    
    for course_list in results:
        all_courses.extend(course_list)
        
    return all_courses

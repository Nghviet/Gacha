from selenium import webdriver
import bs4
import pandas as pd
import requests

url = 'https://www.imdb.com/search/title/?count=100&groups=top_1000&sort=user_rating%27'

def get_page_content(url):
   page = requests.get(url,headers={"Accept-Language":"en-US"})
   return bs4.BeautifulSoup(page.text,"html.parser")

soup = get_page_content(url)
print(soup)
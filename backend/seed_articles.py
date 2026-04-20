import sqlite3
import os

DB_PATH = "/app/charity.db"

articles_data = [
    {
        "title": "Как начать заниматься благотворительностью",
        "slug": "kak-nachat-zanimatsya-blagotvoritelnostyu",
        "image_url": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
        "reading_time": "5 мин",
        "content": "<p>Благотворительность — это не только про деньги, но и про время, навыки и внимание.</p><h3>1. Определите свои ценности</h3><p>Подумайте, какие причины вам близки.</p>"
    }
]

def seed_articles():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    for article in articles_data:
        cursor.execute('''
            INSERT OR REPLACE INTO articles (title, slug, image_url, reading_time, content)
            VALUES (?, ?, ?, ?, ?)
        ''', (article['title'], article['slug'], article['image_url'], 
              article['reading_time'], article['content']))
    
    conn.commit()
    cursor.execute("SELECT id, title, slug FROM articles")
    for row in cursor.fetchall():
        print(f"✅ {row[0]}: {row[1]} (/{row[2]})")
    conn.close()

if __name__ == "__main__":
    seed_articles()

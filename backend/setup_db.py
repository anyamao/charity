import sqlite3
import os

DB_PATH = "/app/charity.db"

def setup_database():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create articles table (idempotent)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            image_url TEXT,
            reading_time TEXT DEFAULT '5 мин',
            content TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Sample article matching your frontend expectations
    article = {
        "title": "Как начать заниматься благотворительностью",
        "slug": "kak-nachat-zanimatsya-blagotvoritelnostyu",
        "image_url": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
        "reading_time": "5 мин",
        "content": "<p>Благотворительность — это не только про деньги, но и про время, навыки и внимание. Начать можно с малого:</p><h3>1. Определите свои ценности</h3><p>Подумайте, какие причины вам близки: помощь детям, животным, экология или поддержка пожилых людей.</p><h3>2. Начните с малого</h3><p>Не обязательно делать крупные пожертвования. Даже небольшая регулярная помощь имеет значение.</p>"
    }
    
    # Insert or replace the article
    cursor.execute('''
        INSERT OR REPLACE INTO articles (title, slug, image_url, reading_time, content)
        VALUES (?, ?, ?, ?, ?)
    ''', (article['title'], article['slug'], article['image_url'], 
          article['reading_time'], article['content']))
    
    conn.commit()
    
    # Verify
    cursor.execute("SELECT id, title, slug FROM articles")
    rows = cursor.fetchall()
    print(f"✅ Database ready! Found {len(rows)} article(s):")
    for row in rows:
        print(f"   • ID {row[0]}: {row[1]} (slug: {row[2]})")
    
    conn.close()

if __name__ == "__main__":
    setup_database()

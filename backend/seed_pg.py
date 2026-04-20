from sqlalchemy import create_engine, text
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://charity:charity_secure_pass_123@localhost:5432/charity_db")
engine = create_engine(DATABASE_URL)

def seed_articles():
    article = {
        "title": "Как начать заниматься благотворительностью",
        "slug": "kak-nachat-zanimatsya-blagotvoritelnostyu",
        "image_url": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
        "reading_time": "5 мин",
        "content": "<p>Благотворительность — это не только про деньги, но и про время, навыки и внимание.</p><h3>1. Определите свои ценности</h3><p>Подумайте, какие причины вам близки.</p>"
    }
    
    with engine.connect() as conn:
        conn.execute(text("""
            INSERT INTO articles (title, slug, image_url, reading_time, content)
            VALUES (:title, :slug, :image_url, :reading_time, :content)
            ON CONFLICT (slug) DO UPDATE SET
                title = EXCLUDED.title,
                image_url = EXCLUDED.image_url,
                content = EXCLUDED.content
        """), article)
        conn.commit()
        print("✅ Article seeded in PostgreSQL")

if __name__ == "__main__":
    seed_articles()

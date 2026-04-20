from sqlalchemy import create_engine, text
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://charity:charity_secure_pass_123@host.docker.internal:5432/charity_db")
engine = create_engine(DATABASE_URL)

def create_tables():
    with engine.connect() as conn:
        # Create articles table
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS articles (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                image_url TEXT,
                reading_time VARCHAR(50) DEFAULT '5 мин',
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """))
        
        # Create users table (since you mentioned it exists)
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                hashed_password VARCHAR(255) NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """))
        
        conn.commit()
        print("✅ Tables created in PostgreSQL")

if __name__ == "__main__":
    create_tables()

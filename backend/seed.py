from app.database import engine, Base, SessionLocal
from app.models.article import Article


def seed():
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created")

    db = SessionLocal()
    if db.query(Article).count() == 0:
        articles = [
            Article(
                title="Charity Project Alpha",
                slug="charity-project-alpha",
                image_url="/aiclose.png",
                reading_time="5 mins",
                content="This is the full content of the first charity project...",
            ),
            Article(
                title="Helping Hands Initiative",
                slug="helping-hands-initiative",
                image_url="/aiclose.png",
                reading_time="3 mins",
                content="Our helping hands initiative focuses on direct community support...",
            ),
            Article(
                title="Community Outreach Program",
                slug="community-outreach-program",
                image_url="/aiclose.png",
                reading_time="7 mins",
                content="Learn about our outreach program that connects donors...",
            ),
        ]
        db.add_all(articles)
        db.commit()
        print("✅ Seeded 3 articles")
    else:
        print("ℹ️  Database already seeded")
    db.close()


if __name__ == "__main__":
    seed()

from app.database import engine, Base
from app.models.user import User  # Import to register the model
from app.models.article import Article  # Import other models too

# Create all tables that don't exist yet
Base.metadata.create_all(bind=engine)
print("✅ Tables created/updated!")

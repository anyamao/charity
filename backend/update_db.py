# backend/update_db.py
from app.database import engine, Base
from app.models.user import User  # Импорт модели "регистрирует" её в SQLAlchemy

# Удаляем старую таблицу и создаём новую с правильными колонками
Base.metadata.drop_all(bind=engine, tables=[User.__table__])
Base.metadata.create_all(bind=engine, tables=[User.__table__])

print("✅ Таблица 'users' обновлена!")

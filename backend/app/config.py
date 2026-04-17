# === backend/app/config.py ===
from pydantic_settings import BaseSettings
from typing import List, Optional
from pydantic import AnyHttpUrl


class Settings(BaseSettings):
    # === 🏷️ Проект ===
    PROJECT_NAME: str = "Charity API"
    VERSION: str = "1.0.0"  # ✅ Добавили!
    API_V1_STR: str = "/api/v1"

    # === 🗄️ База данных ===
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/charity_db"

    # === 🔐 Безопасность ===
    SECRET_KEY: str = (
        "change-me-in-production-use-os-environ"  # 🔄 Замени на случайную строку!
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 дней

    # === 🌐 CORS ===
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "https://rastidobro.ru",
        "https://www.rastidobro.ru",
        "https://maoschool.ru",
        "https://www.maoschool.ru",
    ]

    # === 📧 Email (для сброса пароля — на будущее) ===
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None

    class Config:
        case_sensitive = True
        env_file = ".env"  # Загружать переменные из .env файла


# ✅ Создаём экземпляр настроек
settings = Settings()

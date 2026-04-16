from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Charity API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"

    # ✅ Change to PostgreSQL
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/charity_db"

    SECRET_KEY: str = "your-secret-key-change-this"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"


settings = Settings()

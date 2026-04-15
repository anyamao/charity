from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Charity API"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./charity.db"
    SECRET_KEY: str = "your-secret-key-change-this"

    class Config:
        env_file = ".env"


settings = Settings()

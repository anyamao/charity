# === backend/app/schemas/__init__.py ===
from .user import UserCreate, UserLogin, UserResponse, Token
# Если есть article.py:
# from .article import ArticleCreate, ArticleResponse

__all__ = [
    "UserCreate",
    "UserLogin",
    "UserResponse",  # ✅ Обязательно!
    "Token",
    # "ArticleCreate", "ArticleResponse",
]

# === backend/app/models/__init__.py ===
from .user import User  # ✅ Импортируем класс User из user.py

# Если есть другие модели:
# from .article import Article

__all__ = ["User"]  # ✅ Делаем User доступным при импорте
# __all__ = ["User", "Article"]

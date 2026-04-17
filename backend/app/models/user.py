# backend/app/models/user.py
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

    # 👇 Добавь эти поля, если их нет:
    name = Column(String(255))
    lastname = Column(String(255))
    city = Column(String(255))
    date_of_birth = Column(
        String(50)
    )  # Или Date, если используешь sqlalchemy.types.Date
    contact_type = Column(String(50))
    contact_value = Column(String(255))

    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

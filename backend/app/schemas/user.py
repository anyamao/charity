# === backend/app/schemas/user.py ===
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    email: EmailStr

    password: str = Field(
        ...,
        min_length=6,
        max_length=72,  # ✅ Ограничиваем до 72 символов (безопасно для bcrypt)
        description="Пароль от 6 до 72 символов",
    )
    name: Optional[str] = None
    lastname: Optional[str] = None
    city: Optional[str] = None
    date_of_birth: Optional[str] = None
    contact_type: Optional[str] = None
    contact_value: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):  # ✅ Главный класс для ответа
    id: int
    email: EmailStr
    name: Optional[str] = None
    lastname: Optional[str] = None
    city: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True  # ✅ Критично для SQLAlchemy


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

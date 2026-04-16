from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime
from typing import Optional, Literal
import re


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=72)
    name: str
    lastname: str
    city: str
    date_of_birth: str
    contact_type: Literal["phone", "vk", "telegram"]
    contact_value: str

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("Пароль должен содержать минимум 6 символов")
        if len(v) > 72:
            raise ValueError("Пароль слишком длинный (максимум 72 символа)")
        return v

    @field_validator("contact_value")
    @classmethod
    def validate_contact(cls, v: str, info) -> str:
        contact_type = info.data.get("contact_type")
        if not v.strip():
            raise ValueError("Контактные данные обязательны")
        if contact_type == "phone" and not re.match(
            r"^\+?7?\s?\(?\d{3}\)?[\s\-\d]{7,}$", v
        ):
            raise ValueError("Неверный формат телефона")
        return v.strip()


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: Optional[str] = None
    lastname: Optional[str] = None
    city: Optional[str] = None
    contact_type: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

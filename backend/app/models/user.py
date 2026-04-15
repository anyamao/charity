from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum
from sqlalchemy.sql import func
import enum

from ..database import Base


class ContactType(str, enum.Enum):
    phone = "phone"
    vk = "vk"
    telegram = "telegram"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

    # Profile fields
    name = Column(String(100))
    lastname = Column(String(100))
    city = Column(String(100))
    date_of_birth = Column(String(20))  # Store as ISO date string
    contact_type = Column(Enum(ContactType), default=ContactType.phone)
    contact_value = Column(String(255))

    # Metadata
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

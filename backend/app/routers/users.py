# === 1. ИМПОРТЫ (Обязательно в начале!) ===
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas, models
from ..database import get_db
from ..core.security import get_password_hash

# === 2. СОЗДАНИЕ РОУТЕРА (Самое важное!) ===
# Без этой строки @router пост не будет работать!
router = APIRouter(tags=["users"])


# === 3. ТВОЙ КОД (Теперь он сработает) ===
@router.post(
    "/signup", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED
)
def signup(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if email exists
        existing_user = (
            db.query(models.User).filter(models.User.email == user_in.email).first()
        )
        if existing_user:
            raise HTTPException(status_code=400, detail="Email уже зарегистрирован")

        # Create user
        user = models.User(
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            name=user_in.name,
            lastname=user_in.lastname,
            city=user_in.city,
            date_of_birth=user_in.date_of_birth,
            contact_type=user_in.contact_type,  # Убедись, что ContactType импортирован или это просто строка
            contact_value=user_in.contact_value,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка сервера: {str(e)}")

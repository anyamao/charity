from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext

# Настройки (в продакшене SECRET_KEY брать из .env!)
SECRET_KEY = "my_super_secret_key_change_me"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 7  # Токен живет 7 дней

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# === backend/app/core/security.py ===


# === backend/app/core/security.py ===


# В security.py, внутри get_password_hash:


def get_password_hash(password: str) -> str:
    """
    Hash a password using bcrypt.
    Automatically truncates to 72 bytes to avoid bcrypt limits.
    """
    # 🔧 Truncate to 72 bytes MAX (bcrypt limit)
    pwd_bytes = password.encode('utf-8')
    if len(pwd_bytes) > 72:
        pwd_bytes = pwd_bytes[:72]
        password = pwd_bytes.decode('utf-8', errors='ignore')
    
    return pwd_context.hash(password)



def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

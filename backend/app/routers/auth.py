from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional
import sqlite3
import os
from app.utils.auth import hash_password, verify_password, create_access_token, decode_token

router = APIRouter(prefix="/auth", tags=["auth"])
DB_PATH = "/app/charity.db"

class SignupRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@router.post("/signup", response_model=UserResponse)
async def signup(data: SignupRequest):
    conn = get_db()
    # Check if user exists
    existing = conn.execute("SELECT id FROM users WHERE email = ?", (data.email,)).fetchone()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Insert new user
    hashed = hash_password(data.password)
    cursor = conn.execute("INSERT INTO users (email, hashed_password) VALUES (?, ?)", (data.email, hashed))
    conn.commit()
    conn.close()
    return {"id": cursor.lastrowid, "email": data.email}

@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (form_data.username,)).fetchone()
    conn.close()
    
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"sub": user["email"], "user_id": user["id"]})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_me(token: str = Depends(OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login"))):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db()
    user = conn.execute("SELECT id, email FROM users WHERE email = ?", (payload["sub"],)).fetchone()
    conn.close()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(user)

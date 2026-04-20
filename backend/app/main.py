from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import os
from app.routers import auth

app = FastAPI(title="Charity API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth router
app.…    row = conn.execute("SELECT * FROM articles WHERE slug = ?", (slug,)).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Article not found")
    return dict(row)

@app.get("/api/v1/articles")
async def list_articles():
    conn = get_db()
    rows = conn.execute("SELECT * FROM articles").fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.get("/")
def root():
    return {"message": "API is running", "docs": "/api/v1/docs"}

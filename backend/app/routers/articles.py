from __future__ import annotations  # ✅ Critical fix

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict

from ..database import get_db
from ..models.article import Article as ArticleModel

router = APIRouter()


class ArticleResponse(BaseModel):
    id: int
    title: str
    slug: str
    image_url: Optional[str] = None
    reading_time: Optional[str] = None
    content: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


@router.get("/", response_model=List[ArticleResponse])
def get_articles(db: Session = Depends(get_db)):
    return db.query(ArticleModel).all()


@router.get("/{article_slug}", response_model=ArticleResponse)
def get_article_by_slug(article_slug: str, db: Session = Depends(get_db)):
    article = db.query(ArticleModel).filter(ArticleModel.slug == article_slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Book

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def search_books(
    keyword: str = Query(..., description="Search by title or author"),
    db: Session = Depends(get_db)
):
    results = db.query(Book).filter(
        (Book.title.ilike(f"%{keyword}%")) | 
        (Book.author.ilike(f"%{keyword}%"))
    ).all()

    return [
        {
            "title": book.title,
            "author": book.author,
            "location": book.location,
            "available": bool(book.available)
        }
        for book in results
    ]

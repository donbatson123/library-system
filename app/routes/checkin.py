from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date
from app.database import SessionLocal
from app.models import Book, Checkout

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/{barcode}")
def checkin_book(barcode: str, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.barcode == barcode).first()
    if not book:
        return {"success": False, "message": "Book not found."}

    checkout = db.query(Checkout).filter(
        Checkout.book_id == book.id,
        Checkout.return_date == None
    ).first()

    if not checkout:
        return {"success": False, "message": "Book is not currently checked out."}

    checkout.return_date = date.today()
    book.available = 1
    db.commit()
    return {"success": True, "message": f"{book.title} checked in."}

from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from database import SessionLocal
from models import Book, Checkout, Student

router = APIRouter()

class CheckoutRequest(BaseModel):
    student_id: str
    barcode: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def checkout_book(request: CheckoutRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.library_id_number == request.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    book = db.query(Book).filter(Book.barcode == request.barcode).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    if book.available == 0:
        return {"success": False, "message": "Book is already checked out."}

    checkout = Checkout(
        student_id=student.id,
        book_id=book.id,
        checkout_date=date.today()
    )
    db.add(checkout)
    book.available = 0
    db.commit()

    return {
        "success": True,
        "message": f"{book.title} checked out to {student.name}",
        "book": {
            "title": book.title,
            "barcode": book.barcode
        }
    }

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from database import SessionLocal
from models import Student, Book, Checkout

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{student_id}")
def get_checked_out_books(student_id: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.library_id_number == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    checkouts = (
        db.query(Checkout)
        .join(Book)
        .filter(
            Checkout.student_id == student.id,
            Checkout.return_date == None
        )
        .all()
    )

    books = [
        {
            "title": c.book.title,
            "barcode": c.book.barcode,
            "checkout_date": str(c.checkout_date),
            "overdue": (date.today() - c.checkout_date).days > 14  # loan period = 14 days
        }
        for c in checkouts
    ]

    return {
        "student": {"id": student.library_id_number, "name": student.name},
        "books": books
    }

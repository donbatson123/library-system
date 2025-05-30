from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date
from database import SessionLocal
from models import Book, Checkout

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

    # get student info
    student = db.query(Student).filter(Student.id == checkout.student_id).first()

    # get remaining books still checked out by this student
    still_out = (
        db.query(Book)
        .join(Checkout)
        .filter(
            Checkout.student_id == student.id,
            Checkout.return_date == None
        )
        .all()
    )

    return {
        "success": True,
        "message": f"{book.title} checked in from {student.name}.",
        "book": {"title": book.title, "barcode": book.barcode},
        "student": {"name": student.name, "id": student.library_id_number},
        "still_out": [{"title": b.title, "barcode": b.barcode} for b in still_out],
        "returned_at": str(date.today())
    }

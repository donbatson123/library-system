from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Student, Checkout, Book

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{library_id}")
def get_status(library_id: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.library_id_number == library_id).first()
    if not student:
        return {"message": "Student not found"}
    checkouts = db.query(Checkout).filter(
        Checkout.student_id == student.id,
        Checkout.return_date == None
    ).all()
    books = [db.query(Book).filter(Book.id == c.book_id).first() for c in checkouts]
    return {
        "student": student.name,
        "books_checked_out": [{"title": b.title, "author": b.author} for b in books]
    }

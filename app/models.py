from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.database import Base

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    grade = Column(Integer)
    library_id_number = Column(String, unique=True, index=True)


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String)
    isbn = Column(String, index=True)
    barcode = Column(String, unique=True, index=True)
    location = Column(String)  # e.g. “WRS”, “Main Shelf”, etc.
    available = Column(Integer, default=1)  # 1 = available, 0 = checked out


class Checkout(Base):
    __tablename__ = "checkouts"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    checkout_date = Column(Date)
    return_date = Column(Date, nullable=True)

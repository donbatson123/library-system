from app.database import SessionLocal
from app.models import Book, Student, Checkout
from datetime import date
import random

db = SessionLocal()

# Clear existing records (dev only!)
db.query(Checkout).delete()
db.query(Book).delete()
db.query(Student).delete()

# Students
students = [
    Student(name="Alice Andrews", grade=2, library_id_number="1001"),
    Student(name="Bobby Brown", grade=3, library_id_number="1002"),
    Student(name="Carly Carter", grade=1, library_id_number="1003"),
    Student(name="Dylan Davis", grade=2, library_id_number="1004"),
    Student(name="Ellie Evans", grade=3, library_id_number="1005")
]
db.add_all(students)
db.commit()

# Books
books = [
    Book(title="Pig the Pug", author="Aaron Blabey", isbn="9781338112450", barcode="W1001", location="Shelf A"),
    Book(title="Dragons Don't Cook Pizza", author="Debbie Dadey", isbn="9781338881691", barcode="W1002", location="Shelf B"),
    Book(title="Frankenstein Doesn't Plant Petunias", author="Debbie Dadey", isbn="9781338736632", barcode="W1003", location="Shelf B"),
    Book(title="Catwad", author="Jim Benton", isbn="9781338326024", barcode="W1004", location="Shelf C"),
    Book(title="Fly Guy", author="Tedd Arnold", isbn="9780545078825", barcode="W1005", location="Shelf C"),
    Book(title="The Baddies", author="Julia Donaldson", isbn="9781339009063", barcode="W1006", location="Shelf A"),
    Book(title="How to Catch a Monster", author="Adam Wallace", isbn="9781338221879", barcode="W1007", location="Shelf A"),
    Book(title="G.O.A.T.", author="Kate Temple", isbn="9781546127260", barcode="W1008", location="Shelf D"),
    Book(title="Vampires Don't Wear Polka Dots", author="Debbie Dadey", isbn="9781338736601", barcode="W1009", location="Shelf B"),
    Book(title="Buzz Boy and Fly Guy", author="Tedd Arnold", isbn="9780545222754", barcode="W1010", location="Shelf C"),
]
db.add_all(books)
db.commit()

# Checkouts (simulate a few active checkouts)
checkouts = [
    Checkout(student_id=students[0].id, book_id=books[0].id, checkout_date=date.today()),
    Checkout(student_id=students[1].id, book_id=books[1].id, checkout_date=date.today()),
]
# Mark those books as not available
books[0].available = 0
books[1].available = 0

db.add_all(checkouts)
db.commit()

print("✅ Dev data seeded successfully.")

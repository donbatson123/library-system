from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import pandas as pd
from app.database import SessionLocal
from app.models import Book
import io

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def safe_get(row, key, cast=str):
    val = row.get(key)
    if pd.isna(val) or val == "":
        return None
    try:
        return cast(val) if cast else val
    except:
        return None

@router.post("/upload_books")
async def upload_books(file: UploadFile = File(...), db: Session = Depends(get_db)):
    content = await file.read()
    df = pd.read_csv(io.StringIO(content.decode('utf-8')))
    added = 0
    errors = 0

    for i, row in df.iterrows():
        try:
            barcode = safe_get(row, 'barcode')
            if not barcode:
                continue  # Skip rows with no barcode

            exists = db.query(Book).filter_by(barcode=barcode).first()
            if exists:
                continue  # Skip if already exists

            book = Book(
                isbn=safe_get(row, 'isbn'),
                title=safe_get(row, 'Title'),
                subtitle=safe_get(row, 'Subtitle'),
                authors=safe_get(row, 'Authors'),
                categories=safe_get(row, 'Categories'),
                ddc_number=safe_get(row, 'DDC Number'),
                description=safe_get(row, 'Description'),
                loan_period=safe_get(row, 'loan_period', int),
                branch=safe_get(row, 'branch'),
                price=safe_get(row, 'price', float),
                prefix=safe_get(row, 'Prefix'),
                call_number=safe_get(row, 'Call Number'),
                barcode=barcode,
            )

            db.add(book)
            added += 1

        except Exception as e:
            print(f"❌ Error on row {i} - {row.to_dict()} — {e}")
            errors += 1
            continue

    db.commit()
    return {
        "status": "success",
        "books_added": added,
        "rows_skipped_due_to_error": errors
    }

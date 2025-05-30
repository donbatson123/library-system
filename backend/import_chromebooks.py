import pandas as pd
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Device


CSV_PATH = "chromebook.txt"  # change if needed

def import_devices():
    df = pd.read_csv(CSV_PATH, delimiter="\t")
    df.drop(columns=["Due Date"], inplace=True)

    db: Session = SessionLocal()

    for _, row in df.iterrows():
        if pd.isna(row['barcode']) or pd.isna(row['serial_number']):
            continue  # Skip if missing barcode or serial number

        device = Device(
            barcode=str(row['barcode']).strip(),
            serial_number=str(row['serial_number']).strip(),
            model=str(row.get('model', '')).strip(),
            manufacturer=str(row.get('manufacturer', '')).strip(),
            source=str(row.get('source', '')).strip(),
            location=str(row.get('location', '')).strip(),
            price=float(row.get('Price', 0.0)) if not pd.isna(row.get('Price')) else 0.0,
            status=str(row.get('Status', 'IN')).strip(),
            notes=None
        )
        db.add(device)

    db.commit()
    db.close()
    print("✅ Chromebook import complete.")

if __name__ == "__main__":
    import_devices()

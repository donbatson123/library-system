from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from database import get_db
from models import Device, DeviceCheckout  # adjust import paths if needed
from pydantic import BaseModel

router = APIRouter()

class DeviceCheckInRequest(BaseModel):
    barcode: str

@router.post("/asset/checkin")
def checkin_device(data: DeviceCheckInRequest, db: Session = get_db()):
    # Step 1: Find the device by barcode
    device = db.query(Device).filter(Device.barcode == data.barcode).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")

    # Step 2: Find the most recent active checkout (no return_date)
    checkout = (
        db.query(DeviceCheckout)
        .filter(DeviceCheckout.device_id == device.id)
        .filter(DeviceCheckout.return_date.is_(None))
        .order_by(DeviceCheckout.checkout_date.desc())
        .first()
    )

    if not checkout:
        raise HTTPException(status_code=404, detail="No active checkout found for this device")

    # Step 3: Mark it as returned
    checkout.return_date = date.today()
    db.commit()

    return {"message": "Device checked in successfully", "device_id": device.id}

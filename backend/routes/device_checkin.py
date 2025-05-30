from fastapi import APIRouter, HTTPException, Depends, Body
from sqlalchemy.orm import Session
from datetime import datetime

from database import get_db
from models import Device, DeviceCheckout, Student
from schemas import DeviceCheckinRequest


router = APIRouter(
    tags=["devices"]
)

@router.post("/device-checkin")
def checkin_device(
    data: DeviceCheckinRequest,
    db: Session = Depends(get_db)
):
    device = db.query(Device).filter(Device.barcode == data.barcode).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")

    student = db.query(Student).filter(Student.perm_id == data.perm_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    checkout = (
        db.query(DeviceCheckout)
        .filter(DeviceCheckout.device_id == device.id, DeviceCheckout.return_date.is_(None))
        .first()
    )
    if not checkout:
        raise HTTPException(status_code=400, detail="Device is not currently checked out")

    checkout.return_date = datetime.utcnow().date()
    db.commit()

    return {"message": f"Device {data.barcode} checked in."}

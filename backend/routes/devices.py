@router.post("/devices/checkout")
def checkout_device(payload: DeviceCheckoutSchema, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.barcode == payload.barcode).first()
    student = db.query(Student).filter(Student.perm_id == payload.perm_id).first()

    if not device:
        raise HTTPException(status_code=404, detail="Device not found.")
    if not student:
        raise HTTPException(status_code=404, detail="Student not found.")
    if device.status == "checked_out":
        raise HTTPException(status_code=400, detail="Device already checked out.")

    device.status = "checked_out"
    device.perm_id = payload.perm_id
    device.last_checkout = datetime.utcnow()
    device.due_date = payload.due_date

    db.commit()
    return {"message": "Device checked out successfully."}


@router.post("/devices/checkin")
def checkin_device(payload: DeviceCheckinSchema, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.barcode == payload.barcode).first()

    if not device:
        raise HTTPException(status_code=404, detail="Device not found.")
    if device.status != "checked_out":
        raise HTTPException(status_code=400, detail="Device is not checked out.")

    device.status = "available"
    device.perm_id = None
    device.due_date = None
    device.last_checkin = datetime.utcnow()

    db.commit()
    return {"message": "Device checked in successfully."}


@router.get("/devices/status")
def get_device_status(db: Session = Depends(get_db)):
    return db.query(Device).all()



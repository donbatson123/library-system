from pydantic import BaseModel

class DeviceCheckinRequest(BaseModel):
    barcode: str
    perm_id: int

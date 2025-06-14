from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import checkin, checkout, status, search, admin, device_checkin
import models  

#Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Library Circulation System")

# ✅ Allow your frontend to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://10.0.0.35:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(device_checkin.router, prefix="/devices")
app.include_router(checkin.router, prefix="/checkin")
app.include_router(checkout.router, prefix="/checkout")
app.include_router(status.router, prefix="/status")
app.include_router(search.router, prefix="/search")
app.include_router(admin.router, prefix="/admin")

@app.get("/")
def root():
    return {"message": "Library API is live!"}
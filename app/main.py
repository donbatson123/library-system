from fastapi import FastAPI
from app.database import engine, Base
from app.routes import checkin, checkout, status, search, admin

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Library Circulation System")

app.include_router(checkin.router, prefix="/checkin")
app.include_router(checkout.router, prefix="/checkout")
app.include_router(status.router, prefix="/status")
app.include_router(search.router, prefix="/search")
app.include_router(admin.router, prefix="/admin")

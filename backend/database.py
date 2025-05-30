from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
import os
import time
from sqlalchemy.exc import OperationalError


DATABASE_URL = os.getenv("DATABASE_URL")

for attempt in range(10):
    try:
        engine = create_engine("postgresql://postgres:password@db:5432/library")
        connection = engine.connect()
        connection.close()
        print("Connected to database.")
        break
    except OperationalError as e:
        print(f"DB not ready, attempt {attempt + 1}/10. Retrying...")
        time.sleep(3)


#engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

import pandas as pd
from sqlalchemy import create_engine
from database import DATABASE_URL  # adjust if using from .env or other config
from models import Base, Student  # optional, useful for schema awareness

# Load student CSV (tab-delimited)
df = pd.read_csv("library_students.csv")

# Add blank grade column
df["grade"] = None

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Insert into students table
df.to_sql("students", engine, if_exists="append", index=False)

print("✅ Students imported successfully.")

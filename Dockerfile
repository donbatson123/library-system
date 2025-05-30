FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy all backend code into the container
COPY backend/ .

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install PostgreSQL client (optional but fine to keep)
RUN apt-get update && apt-get install -y postgresql-client

# Start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

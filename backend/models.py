from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float, Text
from sqlalchemy.orm import relationship
from database import Base


class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    grade = Column(Integer)
    perm_id = Column(String, unique=True, index=True)
    staff = Column(String, nullable=True) 


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String)
    isbn = Column(String, index=True)
    barcode = Column(String, unique=True, index=True)
    location = Column(String)  # e.g. “WRS”, “Main Shelf”, etc.
    available = Column(Integer, default=1)  # 1 = available, 0 = checked out


class Checkout(Base):
    __tablename__ = "checkouts"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    checkout_date = Column(Date)
    return_date = Column(Date, nullable=True)
    # 👇 Add this line
    book = relationship("Book")


class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True)
    barcode = Column(String, unique=True, index=True, nullable=False)
    serial_number = Column(String, unique=True, index=True)
    model = Column(String)
    manufacturer = Column(String)
    source = Column(String)
    location = Column(String)
    price = Column(Float)
    status = Column(String)  # 'assigned', 'returned', 'missing', etc.
    notes = Column(Text, nullable=True)

    checkouts = relationship("DeviceCheckout", back_populates="device")


class DeviceCheckout(Base):
    __tablename__ = "device_checkouts"

    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    device_id = Column(Integer, ForeignKey("devices.id"))
    checkout_date = Column(Date)
    return_date = Column(Date, nullable=True)

    student = relationship("Student")
    device = relationship("Device", back_populates="checkouts")


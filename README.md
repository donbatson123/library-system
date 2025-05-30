# library-system
# Library System

A browser-based library circulation and asset tracking system built for K-8 students.  
Currently deployed at Williams Ranch Elementary.

## 📚 Features

- **K–3 Friendly**: Simple book check-in interface using barcode scans or lunch numbers.
- **Searchable Catalog**: Easy for student helpers to search and assist peers.
- **Textbooks Tracked Separately**: Maintains a separate database for curriculum-related books.
- **Chromebook Tracker**: Asset checkout and return system integrated with student IDs.
- **Audit-Friendly**: Tracks student checkouts historically with timestamps and due dates.

## 🛠️ Tech Stack

- **Frontend**: React (Kitty-compatible terminals)
- **Backend**: FastAPI
- **Database**: PostgreSQL (Dockerized or hosted)
- **Containerization**: Docker

## 🚀 Local Development (Coming Soon)

Setup instructions and Docker-based deployment steps will be included later.

## 📦 Components

- `/frontend`: React UI
- `/backend`: FastAPI app with routes for books, devices, and students
- `/data`: Scripts and seed data for PostgreSQL
- `/assets`: Chromebook and textbook barcodes (future)

## 🧑‍🏫 For Admin Use

This tool is built by and for school staff — not a replacement for LibraryWorld, but a tailored companion.

> _“Built because the ones we had weren’t made for our kids.”_

## ✅ Status

- [x] Book check-in/check-out
- [x] Chromebook tracker
- [x] Device history viewer
- [ ] Admin dashboard (in progress)

## 🔒 Private Use Only

This project is developed and maintained solely by Don Batson.  
Please reach out if you'd like a copy or guidance setting up a similar system at your school.


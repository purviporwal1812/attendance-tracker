# Attendance Tracker Application

## Table of Contents

- [Overview](#overview)
- [🛠️ Tech Stack](#-tech-stack)
- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [⚙️ Usage](#-usage)
- [🔒 Security & Authentication](#-security--authentication)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [📬 Contact](#-contact)

---

## Overview

An attendance tracking application built for modern classrooms and offices. Users log in via face recognition, and their attendance is only marked when within a predefined geofenced location. Administrators can manage rooms and view live attendance data.

---

## 🛠️ Tech Stack

| Frontend                  | Backend                  | Other Integrations   |
|---------------------------|--------------------------|----------------------|
| React.js (Vite)           | Node.js + Express        | PostgreSQL           |
| Tailwind CSS              | Passport.js              | Face-api.js          |
| React Router              | Bcrypt                   | Geolocation   |

---

## ✨ Features

- 👤 **Biometric Login** — Face recognition–based login for users.
- 📍 **Geolocation Validation** — Ensures attendance is marked only when physically present in a predefined location.
- 🔐 **Admin Panel** — Manage rooms, locations, and monitor live attendance.
- 🎨 **Theme Support** — Light and Dark mode preference stored in database.
- 📊 **PostgreSQL Backend** — Secure and scalable session and data management.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v14+ & npm
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/purviporwal1812/attendance-tracker.git
   cd attendance-tracker
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend/` folder with:
```ini
PORT=5000
POSTGRES_URL=postgres://user:password@localhost:5432/attendance_db
SESSION_SECRET=your_session_secret
``` 

### Running Locally

```bash
# Start backend server
cd backend
npm run dev

# Start frontend (Vite)
cd ../frontend
npm run dev
```

Open your browser at `http://localhost:5173` to view the app.

---

## ⚙️ Usage

1. **User Registration & Login**: Register via email/password and facial descriptor; then login with face-scan + password.
2. **Mark Attendance**: Upon login, click “Mark Attendance”—your location will be validated against the active room’s geofence.
3. **Admin Panel**: Login at `/admin/login` to manage rooms, set geofences, and view attendance logs in real time.

---

## 🔒 Security & Authentication

- **Sessions** stored in PostgreSQL via `connect-pg-simple`.
- **Passwords** hashed with Bcrypt.
- **Face Descriptors** compared using `face-api.js` with a 0.6 Euclidean distance threshold.
- **Rate Limiting**: One attendance mark per user per hour via `express-rate-limit`.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with clear descriptions and tests where applicable.

---


Project Link: [https://github.com/purviporwal1812/attendance-tracker](https://github.com/yourusername/attendance-tracker)

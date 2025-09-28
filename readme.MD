# 📌 Attendance Service API

A Node.js + Express.js backend service for managing employee attendance with MongoDB Atlas as the database.
Supports user authentication, role-based registration (`admin` & `employee`), and attendance tracking (check-in & check-out).

---

## ✨ Features

- **User Management**

  - Register as `employee` or `admin`
  - Secure password hashing with `bcrypt`
  - JWT authentication with role-based claims
  - Retrieve all users (without passwords)

- **Attendance Management**

  - Check-in with timestamp and location (latitude & longitude)
  - Check-out with timestamp and location
  - Fetch attendance records by user
  - Fetch all attendance records (admin only)

---

## 🗂 Project Structure

```
attendance-service/
│── src/
│   ├── controllers/
│   │   ├── authController.js     # Register, login, user management
│   │   └── attendanceController.js # Attendance CRUD
│   ├── models/
│   │   ├── User.js               # User schema (username, password, role)
│   │   └── Attendance.js         # Attendance schema (checkin/checkout)
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth endpoints
│   │   └── attendanceRoutes.js   # /api/attendance endpoints
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   └── server.js                 # Express app entry point
│── .env                          # Environment variables
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone repository

```bash
git clone https://github.com/your-username/attendance-service.git
cd attendance-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/attendance
JWT_SECRET=supersecretkey
PORT=5000
```

### 4. Run the service

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## 🚀 API Endpoints

### 🔐 Authentication

| Method | Endpoint                      | Description                 |
| ------ | ----------------------------- | --------------------------- |
| POST   | `/api/auth/register/admin`    | Register a new admin        |
| POST   | `/api/auth/register/employee` | Register a new employee     |
| POST   | `/api/auth/login`             | Login and get JWT token     |
| GET    | `/api/auth/users`             | Get all users (no password) |

---

### 🕒 Attendance

| Method | Endpoint                       | Description                |
| ------ | ------------------------------ | -------------------------- |
| POST   | `/api/attendance/checkin`      | Record employee check-in   |
| POST   | `/api/attendance/checkout`     | Record employee check-out  |
| GET    | `/api/attendance/user/:userId` | Get attendance by user     |
| GET    | `/api/attendance`              | Get all attendance records |

---

## 📌 Example Requests

### Register Employee

```http
POST /api/auth/register/employee
Content-Type: application/json

{
  "username": "john",
  "password": "123456"
}
```

### Register Admin

```http
POST /api/auth/register/admin
Content-Type: application/json

{
  "username": "superadmin",
  "password": "123456"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "123456"
}
```

Response:

```json
{
  "token": "xxx.yyy.zzz",
  "role": "employee"
}
```

### Check-in

```http
POST /api/attendance/checkin
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "userId": "68a1e966249c5c781194bd4a",
  "latitude": -6.2,
  "longitude": 106.816666
}
```

---

## 🔒 Security Notes

- Passwords are hashed with `bcrypt` before saving to database.
- JWT tokens include user `id` and `role`.
- You can implement middleware to restrict certain endpoints to `admin` role only (recommended).

---

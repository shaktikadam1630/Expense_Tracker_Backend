# 💰 Expense Tracker (Backend)

## 1. Project Description

This is the backend for an **Expense Tracker Application**, built using **Node.js**, **Express.js**, and **MongoDB**.  
It helps users record, manage, and track their daily expenses with secure authentication and personalized data handling.  
Each user can **add, update, view, and delete** their own expenses.

The backend uses **JWT-based authentication** to ensure that each user can only access their own data.

---

### Key Features

- Secure user authentication using **JWT**  
- CRUD operations for managing **expenses**  
- Category-based expense summaries  
- **Password encryption** using bcrypt  
- Well-structured **RESTful API** for smooth frontend integration  

---

## 2. Setup and Run Locally

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/shaktikadam1630/Expense_Tracker_Backend.git
cd Expense_Tracker_Backend
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Create a .env file in the root directory
ini
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense_tracker
JWT_SECRET=your_jwt_secret_key
4️⃣ Start the server
bash
Copy code
npm start
The server will run at:
👉 http://localhost:5000

3. API Testing
You can test the backend using Postman or Thunder Client.

Auth Routes
POST /auth/signup – Register a new user

POST /auth/login – Login to get a JWT token

Example Login Response:

json
Copy code
{
  "userResponse": {
    "_id": "671df7d39c6ee0ed5f6a6f00",
    "name": "Shakti",
    "email": "shakti@example.com",
    "token": "your_jwt_token_here"
  }
}
Expense Routes (Require JWT Token)
GET /expenses/all – Fetch all expenses of a user

POST /expenses/all – Add a new expense

PUT /expenses/:id – Update an expense

DELETE /expenses/:id – Delete an expense

GET /expenses/summary – View category-wise summary

Example: Add Expense
POST /expenses/all

Headers:

pgsql
Copy code
Authorization: Bearer <your_token>
Content-Type: application/json
Body:

json
Copy code
{
  "category": "Food",
  "amount": 300,
  "comments": "Dinner with family"
}
Response:

json
Copy code
{
  "message": "Expense added successfully",
  "expense": {
    "_id": "6723ad98efab1234c8e1d7b9",
    "userId": "670df7d39c6ee0ed5f6a6f00",
    "category": "Food",
    "amount": 300,
    "comments": "Dinner with family",
    "createdAt": "2025-11-08T14:05:00.000Z"
  }
}
4. Assumptions and Design Choices
Each user’s data is private and protected via JWT token validation

Passwords are hashed using bcrypt before storage

Follows a clean MVC (Model-View-Controller) structure

MongoDB ensures fast and scalable data storage

Each expense contains: category, amount, comments, and timestamps

Designed for seamless integration with Flutter frontend

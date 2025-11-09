# 💰 Expense Tracker Backend

This is the **backend** for an **Expense Tracker Application**, built with **Node.js**, **Express.js**, and **MongoDB**.  
It provides secure user authentication (JWT) and CRUD operations so each user can add, update, view, and delete their own expenses.

---

## 🚀 Key Features

- 🔒 JWT-based authentication (per-user access)
- ✏️ CRUD operations for expenses
- 📊 Category-wise expense summary (aggregation)
- 🔐 Password hashing with **bcrypt**
- 🧩 Clean MVC structure for easy frontend integration (Flutter/web)

---

## ⚙️ Quick Start

```bash
# 1. Clone
git clone https://github.com/shaktikadam1630/Expense_Tracker_Backend.git
cd Expense_Tracker_Backend

# 2. Install dependencies
npm install

# 3. Create .env in project root with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/expense_tracker
# JWT_SECRET=your_jwt_secret_key

# 4. Start server
npm start

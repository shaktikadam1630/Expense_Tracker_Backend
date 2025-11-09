const express = require("express");
const { addExpense, getExpenses, updateExpense, deleteExpense, getCategorySummary } = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", authMiddleware, addExpense);
router.get("/all", authMiddleware, getExpenses);
router.put("/update/:id", authMiddleware, updateExpense);
router.delete("/delete/:id", authMiddleware, deleteExpense);
router.get("/summary", authMiddleware, getCategorySummary);

module.exports = router;

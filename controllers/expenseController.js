const Expense = require("../Models/Expense");
const mongoose = require("mongoose");




exports.addExpense = async (req, res) => {
  try {
    const { category, amount, comments } = req.body;

    // ✅ Validate input
    if (!category || !amount) {
      return res.status(400).json({ message: "Category and amount are required" });
    }

    // ✅ Create expense linked to logged-in user
    const expense = new Expense({
      userId: req.user.id,
      category,
      amount,
      comments: comments || "",
    });

    const savedExpense = await expense.save();

    // ✅ Fetch updated list of all user expenses
    const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });

    // ✅ Respond with success message and data
    res.status(201).json({
      message: "Expense added successfully",
      expense: savedExpense,
      expenses,
    });

  } catch (error) {
    console.error("💥 Add Expense Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(expenses);
    console.log(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Expense updated", updated });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const removed = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!removed) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Expense deleted" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCategorySummary = async (req, res) => {
  try {
    // Convert user ID to ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);


    const summary = await Expense.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } }
    ]);

    res.status(200).json(summary);

  } catch (error) {
    console.error("Aggregation error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

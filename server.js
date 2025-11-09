const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());


// Connect DB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);


app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running...");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port 5000"));

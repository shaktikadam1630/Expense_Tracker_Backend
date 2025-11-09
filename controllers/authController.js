const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists!" });

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔑 Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Create JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token:token,
    };

  res.status(200).json({
  message: "Login successful",
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
  token: token,
});


  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

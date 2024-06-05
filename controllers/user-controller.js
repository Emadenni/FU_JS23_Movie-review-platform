const User = require("../models/user-model");
const Review = require("../models/review-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const requiredRegistrationFields = ["username", "email", "password", "role"];
const requiredLoginFields = ["email", "password"];
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already in use");
    }
    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ status: "success", message: "Login successful", token, userId: user._id });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.removeUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Elimina l'utente
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await Review.deleteMany({ userId: userId });

    res.status(200).send("User and associated reviews deleted successfully");
  } catch (error) {
    console.error("Error deleting user and associated reviews:", error);
    res.status(500).send("Internal server error");
  }
};
exports.removeAllUsers = async (req, res) => {
  try {
    const deleteUsersResult = await User.deleteMany({});

    const deleteReviewsResult = await Review.deleteMany({});

    res.status(200).send(`All users and associated reviews deleted successfully. `);
  } catch (error) {
    console.error("Error deleting all users:", error);
    res.status(500).send("Internal server error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).send("No users found");
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.requiredRegistrationFields = requiredRegistrationFields;
module.exports.requiredLoginFields = requiredLoginFields;

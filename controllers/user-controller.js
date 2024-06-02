const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const requiredRegistrationFields = ['username', 'email', 'password', 'role'];
const requiredLoginFields = ['email', 'password'];
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

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({"status" : "success", "message": "Login successful", token, userId: user._id});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.requiredRegistrationFields = requiredRegistrationFields 
module.exports.requiredLoginFields  = requiredLoginFields 


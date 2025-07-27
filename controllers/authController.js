const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

// REGISTER Controller
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    // Validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Check if user already exists
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please login",
      });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });

    res.status(201).json({
      success: true,
      message: "Successfully registered",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error in Register API. See logs for details.',
      error: error.message,
    });
  }
};

// LOGIN Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user, // avoid sending password in production
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error in Login API. See logs for details.',
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController };

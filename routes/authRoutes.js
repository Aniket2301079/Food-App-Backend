// Importing required modules
const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

// Creating a new router instance
const router = express.Router();

// ========================
//        AUTH ROUTES
// ========================

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerController);

// @route   POST /api/v1/auth/login
// @desc    Login user with credentials
// @access  Public
router.post("/login", loginController);

// Exporting the router to be used in the main app
module.exports = router;

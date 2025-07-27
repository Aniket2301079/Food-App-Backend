const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

// Initialize router
const router = express.Router();

// ============================================
// @route   GET /api/v1/user/getUser
// @desc    Get logged-in user's details
// @access  Private
// ============================================
router.get("/getUser", authMiddleware, getUserController);

// ============================================
// @route   PUT /api/v1/user/updateUser
// @desc    Update user profile info
// @access  Private
// ============================================
router.put("/updateUser", authMiddleware, updateUserController);

// ============================================
// @route   POST /api/v1/user/updatePassword
// @desc    Change current user password
// @access  Private
// ============================================
router.post("/updatePassword", authMiddleware, updatePasswordController);

// ============================================
// @route   POST /api/v1/user/resetPassword
// @desc    Reset password using email/token
// @access  Private (can be made Public if needed)
// ============================================
router.post("/resetPassword", authMiddleware, resetPasswordController);

// ============================================
// @route   DELETE /api/v1/user/deleteUser/:id
// @desc    Delete a user by ID
// @access  Private
// ============================================
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

// Export router
module.exports = router;

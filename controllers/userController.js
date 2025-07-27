const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// ==============================
// @desc    Get current user info
// @route   GET /api/v1/user
// ==============================
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Remove password before sending
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error: error.message,
    });
  }
};

// ==============================
// @desc    Update user profile
// @route   PUT /api/v1/user
// ==============================
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error: error.message,
    });
  }
};

// ======================================
// @desc    Update password with old one
// @route   PUT /api/v1/user/password
// ======================================
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old and new passwords",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Password Update API",
      error: error.message,
    });
  }
};

// ==================================
// @desc    Reset password via email
// @route   POST /api/v1/user/reset-password
// ==================================
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found or incorrect security answer",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Password Reset API",
      error: error.message,
    });
  }
};

// ==============================
// @desc    Delete user account
// @route   DELETE /api/v1/user
// ==============================
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.user.id);
    res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Profile API",
      error: error.message,
    });
  }
};

// ==============================
// EXPORT CONTROLLERS
// ==============================
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};

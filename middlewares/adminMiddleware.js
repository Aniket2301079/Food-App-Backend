// Import the user model
const userModel = require("../models/userModel");

// Middleware to check if the user is an admin
module.exports = async (req, res, next) => {
  try {
    // Use the ID set in authMiddleware (from JWT token)
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is not an admin
    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access",
      });
    }

    // If admin, continue
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized Access",
      error,
    });
  }
};

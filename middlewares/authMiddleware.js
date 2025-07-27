// Import the JWT library
const JWT = require("jsonwebtoken");

// ✅ Authentication middleware to verify JWT tokens
module.exports = async (req, res, next) => {
  try {
    // Get the 'Authorization' header from the request
    const authHeader = req.headers["authorization"];

    // Check if token is present and follows the 'Bearer <token>' format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Extract token from 'Bearer <token>'
    const token = authHeader.split(" ")[1];

    // Verify token using secret key
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Invalid token",
        });
      }

      // ✅ Attach user ID from decoded token to request object
      req.user = { id: decoded.id };

      // ✅ Pass control to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error("Authentication Middleware Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: Token processing failed",
      error: error.message,
    });
  }
};

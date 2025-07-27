// Import required packages
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDb } = require('./config/db.js');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDb();

// Create express application
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Log HTTP requests

// Routes setup
app.use("/api/v1/test", require("./routes/testRoutes.js"));
app.use("/api/v1/auth", require("./routes/authRoutes.js"));
app.use("/api/v1/user", require("./routes/userRoutes.js"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes.js"));
app.use("/api/v1/category", require("./routes/categoryRoutes.js"));
app.use("/api/v1/food", require("./routes/foodRoutes.js"));
// Main root route
app.get('/', (req, res) => {
  return res.status(200).send("Welcome to the web");
});

// Set server port from environment or fallback to 8000
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

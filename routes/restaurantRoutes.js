const express = require("express");

// Middleware for user authentication
const authMiddleware = require("../middlewares/authMiddleware");

// Import restaurant controllers
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

// ROUTES

// ✅ CREATE RESTAURANT - POST
// @route   POST /api/v1/restaurant/create
// @desc    Create a new restaurant (Authenticated users only)
// @access  Private
router.post("/create", authMiddleware, createRestaurantController);

// ✅ GET ALL RESTAURANTS - GET
// @route   GET /api/v1/restaurant/getAll
// @desc    Fetch all restaurants
// @access  Public
router.get("/getAll", getAllRestaurantController);

// ✅ GET SINGLE RESTAURANT BY ID - GET
// @route   GET /api/v1/restaurant/get/:id
// @desc    Fetch restaurant by its ID
// @access  Public
router.get("/get/:id", getRestaurantByIdController);

// ✅ DELETE RESTAURANT - DELETE
// @route   DELETE /api/v1/restaurant/delete/:id
// @desc    Delete a restaurant by ID (Authenticated users only)
// @access  Private
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;

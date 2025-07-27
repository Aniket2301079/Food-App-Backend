// Importing required modules
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryController");

// Initializing router
const router = express.Router();

// ============================
//     CATEGORY ROUTES
// ============================

// @route   POST /api/v1/category/create
// @desc    Create a new category (Requires Auth)
// @access  Private
router.post("/create", authMiddleware, createCatController);

// @route   GET /api/v1/category/getAll
// @desc    Get all categories
// @access  Public
router.get("/getAll", getAllCatController);

// @route   PUT /api/v1/category/update/:id
// @desc    Update a category by ID (Requires Auth)
// @access  Private
router.put("/update/:id", authMiddleware, updateCatController);

// @route   DELETE /api/v1/category/delete/:id
// @desc    Delete a category by ID (Requires Auth)
// @access  Private
router.delete("/delete/:id", authMiddleware, deleteCatController);

// Exporting router
module.exports = router;

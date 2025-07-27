const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");

const router = express.Router();

// ============================
//         FOOD ROUTES
// ============================

// @route   POST /api/v1/food/create
// @desc    Create a new food item
// @access  Protected (Authenticated users only)
router.post("/create", authMiddleware, createFoodController);

// @route   GET /api/v1/food/getAll
// @desc    Get all food items
// @access  Public
router.get("/getAll", getAllFoodsController);

// @route   GET /api/v1/food/get/:id
// @desc    Get a single food item by ID
// @access  Public
router.get("/get/:id", getSingleFoodController);

// @route   GET /api/v1/food/getByRestaurant/:id
// @desc    Get all food items by restaurant ID
// @access  Public
router.get("/getByRestaurant/:id", getFoodByRestaurantController); // Consider renaming "getByRestaurant" to "getByRestaurant" in routes and controller for spelling consistency

// @route   PUT /api/v1/food/update/:id
// @desc    Update a food item
// @access  Protected (Authenticated users only)
router.put("/update/:id", authMiddleware, updateFoodController);

// @route   DELETE /api/v1/food/delete/:id
// @desc    Delete a food item
// @access  Protected (Authenticated users only)
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// ============================
//         ORDER ROUTES
// ============================

// @route   POST /api/v1/food/placeorder
// @desc    Place a new food order
// @access  Protected (Authenticated users only)
router.post("/placeorder", authMiddleware, placeOrderController);

// @route   POST /api/v1/food/orderStatus/:id
// @desc    Update order status (Admin only)
// @access  Protected (Admin only)
router.post("/orderStatus/:id", authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;

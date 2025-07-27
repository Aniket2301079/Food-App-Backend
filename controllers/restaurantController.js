const resturantModel = require("../models/resturantModel");

// ================================
// @desc    Create a new restaurant
// @route   POST /api/v1/restaurants
// ================================
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    // Validation
    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and location coordinates",
      });
    }

    // Create restaurant document
    const newRestaurant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New restaurant created successfully",
      newRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
      error,
    });
  }
};

// ==================================
// @desc    Get all restaurants
// @route   GET /api/v1/restaurants
// ==================================
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await resturantModel.find({});

    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Restaurants API",
      error,
    });
  }
};

// =======================================
// @desc    Get restaurant by ID
// @route   GET /api/v1/restaurants/:id
// =======================================
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a restaurant ID",
      });
    }

    const restaurant = await resturantModel.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found with this ID",
      });
    }

    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Restaurant By ID API",
      error,
    });
  }
};

// ========================================
// @desc    Delete a restaurant by ID
// @route   DELETE /api/v1/restaurants/:id
// ========================================
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a restaurant ID",
      });
    }

    const deleted = await resturantModel.findByIdAndDelete(restaurantId);

    if (!deleted) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found to delete",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant API",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};

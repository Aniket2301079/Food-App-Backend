const mongoose = require("mongoose");

// Define the schema for a food item
const foodSchema = new mongoose.Schema(
  {
    // Name of the food item
    title: {
      type: String,
      required: [true, "Food title is required"],
    },

    // Description of the food item
    description: {
      type: String,
      required: [true, "Food description is required"],
    },

    // Price of the food item
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },

    // Image URL representing the food
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },

    // Optional tags for search/filter (e.g., spicy, vegetarian)
    foodTags: {
      type: String,
    },

    // Category name (e.g., Pizza, Desserts) – could be improved by referencing Category model
    category: {
      type: String,
    },

    // Custom internal or display code for food item (optional)
    code: {
      type: String,
    },

    // Whether the food item is currently available for order
    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Reference to the restaurant this food belongs to
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },

    // Average rating of the food item
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    // Total number of ratings given (could be number instead of string)
    ratingCount: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export the model to use in controllers or routes
module.exports = mongoose.model("Foods", foodSchema);

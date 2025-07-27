const mongoose = require("mongoose");

// Define the schema for a food category
const categorySchema = new mongoose.Schema(
  {
    // Title of the category (e.g., Pizza, Desserts)
    title: {
      type: String,
      required: [true, "Category title is required"],
    },

    // Image URL for representing the category visually
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
  },
  {
    timestamps: true, // Automatically includes createdAt and updatedAt fields
  }
);

// Export the model to use in other parts of the app
module.exports = mongoose.model("Category", categorySchema);

const mongoose = require("mongoose");

// Orders Schema Definition
const ordersSchema = new mongoose.Schema(
  {
    // Array of food item references (linked from the Foods collection)
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],

    // Payment details (you can define a structured schema here later if needed)
    payment: {},

    // Buyer reference (linked from the User collection)
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Current status of the order
    status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model("Orders", ordersSchema);

const mongoose = require('mongoose');

// Restaurant Schema Definition
const restaurantSchema = new mongoose.Schema({
  // Title of the restaurant (required)
  title: {
    type: String,
    required: [true, 'Restaurant title is required'],
  },

  // Image URL of the restaurant
  imageUrl: {
    type: String,
  },

  // List of food items (could be ObjectIds referencing Foods schema later)
  foods: {
    type: Array,
  },

  // Estimated delivery or service time
  time: {
    type: String,
  },

  // Whether pickup is available
  pickup: {
    type: Boolean,
    default: true,
  },

  // Whether delivery is available
  delivery: {
    type: Boolean,
    default: true,
  },

  // Whether the restaurant is currently open
  isOpen: {
    type: Boolean,
  },

  // Logo image URL of the restaurant
  logoUrl: {
    type: String,
  },

  // Average rating (1 to 5)
  rating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },

  // Total number of ratings (stored as string)
  ratingCount: {
    type: String,
  },

  // Unique code or identifier for the restaurant
  code: {
    type: String,
  },

  // Location and coordinates data
  coords: {
    id: { type: String },
    latitude: { type: Number },
    latitudeDelta: { type: Number },
    longitude: { type: Number },
    longitudeDelta: { type: Number },
    address: { type: String },
  }
},
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model with corrected name: 'Restaurant'
module.exports = mongoose.model('Restaurant', restaurantSchema);

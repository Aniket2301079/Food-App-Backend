const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
   // Username of the user
   userName: {
      type: String,
      required: [true, 'User name is required'],
   },
   // Email address (must be unique)
   email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
   },
   // User password (should be hashed before saving)
   password: {
      type: String,
      required: [true, 'Password is required'],
   },
   // Address can store multiple values like multiple saved addresses
   address: {
      type: Array,
      required: [true, 'Address is required'],
   },
   // Phone number
   phone: {
      type: String,
      required: [true, 'Phone number is required'],
   },
   // Role of the user: client, admin, vendor, or driver
   usertype: {
      type: String,
      required: [true, 'User type is required'],
      default: 'client',
      enum: ['client', 'admin', 'vendor', 'driver'],
   },
   // Profile image URL
   profile: {
      type: String,
      default: 'https://static.vecteezy.com/system/resources/previews/004/607/791/non_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg',
   },
   // Answer to security question (for password recovery or verification)
   answer: {
      type: String,
      required: [true, 'Answer is required'],
   },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Export the User model
module.exports = mongoose.model('User', userSchema);

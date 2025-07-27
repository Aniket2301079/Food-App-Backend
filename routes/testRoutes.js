const express = require('express');
const { testUserController } = require('../controllers/testController');

// Initialize router object
const router = express.Router();

// =============================
// @route   GET /api/v1/test/test-user
// @desc    Test route for user (used for checking API status or dummy response)
// @access  Public
// =============================
router.get('/test-user', testUserController);

// Export the router
module.exports = router;

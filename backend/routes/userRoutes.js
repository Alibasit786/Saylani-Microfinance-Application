const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile } = require('../controllers/authController');
const { changePassword } = require('../controllers/authController');

// Protected route to get user profile
router.get('/profile', auth, getProfile);
router.put('/change-password', auth, changePassword); // <-- Use PUT for updating

module.exports = router;

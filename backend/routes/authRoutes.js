// backend/routes/authRoutes.js
const express = require('express');
const { register, login, changePassword } = require('../controllers/authController');
const protect = require('../middleware/auth');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/change-password', protect, changePassword);

module.exports = router;

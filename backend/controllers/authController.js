// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.register = async (req, res) => {
  const { name, email, cnic } = req.body;

  try {
    const existing = await User.findOne({ $or: [{ email }, { cnic }] });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const tempPassword = Math.random().toString(36).substring(2, 10);
    const newUser = new User({ name, email, cnic, password: tempPassword });

    await newUser.save();
    await sendEmail(email, 'Your Temporary Password', `Your password: ${tempPassword}`);

    res.status(201).json({ message: 'User registered. Check email for password.' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { cnic, password } = req.body;

  try {
    const user = await User.findOne({ cnic });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to change password', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load user profile' });
  }
};
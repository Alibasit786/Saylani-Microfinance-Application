// backend/routes/adminRoutes.js
const express = require('express');
const protect = require('../middleware/auth');
const router = express.Router();
const {
  getAllApplications,
  filterApplications,
  updateApplication,
} = require('../controllers/adminController');

// Middleware: only admins allowed
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  next();
};

router.use(protect, adminOnly);

router.get('/applications', getAllApplications);
router.get('/applications/filter', filterApplications);
router.put('/applications/:id',protect, updateApplication);
exports.updateApplication = async (req, res) => {
  const { id } = req.params;
  const { status, tokenNumber } = req.body;

  try {
    const application = await LoanApplication.findById(id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    if (status) application.status = status;
    if (tokenNumber) application.tokenNumber = tokenNumber;

    await application.save();
    res.status(200).json({ message: 'Application updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application', error: err.message });
  }
};

module.exports = router;

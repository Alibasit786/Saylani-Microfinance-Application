// backend/routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  submitLoan,
  addGuarantors,
  getLoanDetails,
  generateSlip,
} = require('../controllers/loanController');

router.post('/submit', protect, submitLoan);
router.post('/guarantors', protect, addGuarantors);
router.get('/my-loans', protect, getLoanDetails);
router.get('/slip/:loanId', protect, generateSlip);

module.exports = router;
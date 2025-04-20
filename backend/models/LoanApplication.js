// backend/models/LoanApplication.js
const mongoose = require('mongoose');

const guarantorSchema = new mongoose.Schema({
  name: String,
  email: String,
  cnic: String,
  location: String,
});

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  subcategory: String,
  amount: Number,
  period: Number,
  deposit: Number,
  tokenNumber: { type: String, default: null },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  statement: String,
  salarySheet: String,
  address: String,
  phone: String,
  city: String,
  country: String,
  guarantors: [guarantorSchema],
}, { timestamps: true });

module.exports = mongoose.model('LoanApplication', loanSchema);

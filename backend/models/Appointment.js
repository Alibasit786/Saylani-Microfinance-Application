const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanApplication' },
  date: String,
  time: String,
  location: String,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);


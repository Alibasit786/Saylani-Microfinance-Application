// backend/controllers/loanController.js
const LoanApplication = require('../models/LoanApplication');
const Appointment = require('../models/Appointment');
const generateQR = require('../utils/generateQR');


exports.submitLoan = async (req, res) => {
  const {
    category,
    subcategory,
    amount,
    deposit,
    period,
    address,
    phone,
    city,
    country,
    statement,
    salarySheet,
    guarantor1,
    guarantor2,
  } = req.body;

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }

    // Create loan
    const loan = new LoanApplication({
      user: req.user._id,
      category,
      subcategory,
      amount,
      deposit,
      period,
      address,
      phone,
      city,
      country,
      statement,
      salarySheet,
      guarantors: [guarantor1, guarantor2],
    });

    await loan.save();

    // Create appointment
    const appointment = new Appointment({
      loanId: loan._id,
      date: '2025-05-01',
      time: '10:30 AM',
      location: 'Saylani Office, Karachi',
    });

    await appointment.save();

    // Generate token
    loan.tokenNumber = `TOKEN-${loan._id.toString().slice(-5).toUpperCase()}`;
    await loan.save();

    res.status(201).json({
      message: 'Loan submitted and appointment created',
      loanId: loan._id,
    });
  } catch (err) {
    console.error('❌ Loan submission error:', err);
    res.status(500).json({ message: 'Failed to submit loan', error: err.message });
  }
};



exports.addGuarantors = async (req, res) => {
  const { loanId, guarantors } = req.body;

  try {
    const loan = await LoanApplication.findById(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    loan.guarantors = guarantors;
    await loan.save();

    res.status(200).json({ message: 'Guarantors added' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add guarantors', error: err.message });
  }
};

exports.getLoanDetails = async (req, res) => {
  try {
    const loans = await LoanApplication.find({ user: req.user._id });
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get loan details', error: err.message });
  }
};

exports.generateSlip = async (req, res) => {
  const { loanId } = req.params;

  try {
    const loan = await LoanApplication.findById(loanId).populate('user');
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    const appointment = new Appointment({
      loanId: loan._id,
      date: '2025-05-01',
      time: '10:30 AM',
      location: 'Saylani Office, Karachi',
    });

    loan.tokenNumber = `TOKEN-${loan._id.toString().slice(-5).toUpperCase()}`;
    await loan.save();

    const slipData = {
      name: loan.user.name,
      cnic: loan.user.cnic,
      token: loan.tokenNumber,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
    };

    const qrCode = await generateQR(JSON.stringify(slipData));

    res.status(200).json({
      user: {
        name: loan.user.name,
        cnic: loan.user.cnic,
      },
      category: loan.category,
      subcategory: loan.subcategory,
      amount: loan.amount,
      tokenNumber: loan.tokenNumber,
      appointment: {
        date: appointment.date,
        time: appointment.time,
        location: appointment.location,
      },
      qrCode,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate slip', error: err.message });
  }
};






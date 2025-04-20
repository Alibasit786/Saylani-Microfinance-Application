// backend/controllers/adminController.js
const LoanApplication = require('../models/LoanApplication');
const Appointment = require('../models/Appointment');

// 🔹 View all loan applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await LoanApplication.find().populate('user');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications', error: err.message });
  }
};

// 🔹 Filter applications by city or country
exports.filterApplications = async (req, res) => {
  const { city, country } = req.query;
  let filter = {};

  if (city) filter.city = city;
  if (country) filter.country = country;

  try {
    const applications = await LoanApplication.find(filter).populate('user');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Filter failed', error: err.message });
  }
};

// 🔹 Update application status (approve, reject) and token
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

// 🔹 View single application in detail
exports.getApplicationDetails = async (req, res) => {
  try {
    const application = await LoanApplication.findById(req.params.id).populate('user');
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch details', error: err.message });
  }
};



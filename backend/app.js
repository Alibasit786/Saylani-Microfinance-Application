// backend/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const loanRoutes = require('./routes/loanRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userroutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // your frontend
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/loan', loanRoutes);
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
  res.send('Saylani Microfinance API is running...');
});

module.exports = app;

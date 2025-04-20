// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

try {
  await transporter.sendMail({
    from: `"Saylani Microfinance" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });

  console.log(`Email sent to ${to}`);
} catch (error) {
  console.error('Error sending email:', error);
  throw error;
}
};

module.exports = sendEmail;

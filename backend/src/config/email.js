const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html
  });
};

module.exports = {
  sendEmail
};
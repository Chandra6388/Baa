// backend/razorpay.js
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_SECRET_KEY',
});

module.exports = razorpay;

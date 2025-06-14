// backend/routes/payment.js
const express = require('express');
const razorpay = require('../razorpay');
const router = express.Router();

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // in paise
    currency: 'INR',
    receipt: 'receipt_order_' + Math.random(),
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({ status: true, order: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, error: 'Order creation failed' });
  }
});

module.exports = router;

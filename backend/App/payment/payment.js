const express = require('express');
const razorpay = require('../razorpay/razorpay');
const db = require('../../models');





class Payment {
  async createOrder(req, res) {
    const { userId, price } = req.body

    const options = {
      amount: amount * 100,
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
  }

}


module.exports = new Payment();
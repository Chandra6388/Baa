const db = require('../models');
const paymentDb = db.payment;
const razorpay = require('../razorpay/razorpay');

class Payment {
  async createOrder(req, res) {
    const { userId, price } = req.body;

    const options = {
      amount: price * 100,
      currency: "INR",
      receipt: "receipt_order_" + Math.random(),
    };

    try {
      const response = await razorpay.orders.create(options);
      res.json({ status: true, order: response });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, error: "Order creation failed" });
    }
  }

  async savePayment(req, res) {
    try {
      const { userId, order_id, payment_id, amount, currency, items } = req.body;

      const newPayment = new paymentDb({
        userId,
        order_id,
        payment_id,
        amount,
        currency,
        items
      });
      await newPayment.save();
      res.send({ status: true, message: "Payment saved" });
    } catch (error) {
      console.error("Save payment error:", error);
      res.send({ status: false, error: "Failed to save payment" });
    }
  }

  async getAllPayment(req, res) {
    const { userId } = req.body;
    if (!userId) {
      return res.send({ status: false, message: "User id is require" })
    }
    try {
      const data = await paymentDb.find({ userId: userId })
      return res.send({ status: true, message: "all transection get successfully", data: data })
    }
    catch {
      return res.send({ status: false, message: "Interal server error , pls try again letter", error: error.message })
    }
  }
}

module.exports = new Payment();

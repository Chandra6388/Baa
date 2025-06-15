const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "INR",
  },
  items: [{
    Quantity: {
      type: Number,
      default: 0
    },
    productDetails: {
      image_url: {
        type: [String],
        default: []
      },
      name: {
        type: String,
        trim: true,
        default: null,
      },
      offer_price: {
        type: Number,
        default: 0,
      },

    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    }
  }],
  address: {
    type: String,
    trim: true,
    default: null
  },
  status: {
    type: String,
    default: "success",
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Payment", paymentSchema);

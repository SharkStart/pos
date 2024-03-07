const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
    mesa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mesa',
      required: true,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

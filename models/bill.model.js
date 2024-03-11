const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  status: {
    type: Boolean,
    default: false,
  },
  method: {
    type: String,
  },
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;

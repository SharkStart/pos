const mongoose = require('mongoose');

const producSchema = new mongoose.Schema({

  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', producSchema);

module.exports = Product;

const mongoose = require('mongoose');

const producSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Product = mongoose.model('Product', producSchema)

module.exports = Product;
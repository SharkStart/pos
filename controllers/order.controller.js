const Order = require('../models/order.model');

const orderController = {
  createOrder: async (req, res) => {
    try {
        { }


    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

};

module.exports = orderController;
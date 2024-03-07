/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const Order = require('../models/order.model');

const orderController = {
  createOrder: async (req, res) => {
    try {
      if (req.user.rol !== 'mesero' && req.user.rol !== 'admin' && req.user.rol !== 'cocina') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
      const { status, table, products } = req.body;
      const { id } = req.user;
      // Recuperar los detalles de los productos asociados a los IDs
      // const productDetails = await Product.find({ _id: { $in: products } });

      // Crear una nueva orden con los detalles de los productos
      const newOrder = new Order({
        user: id,
        products,
        status: status || false,
        table,
      });

      // Guardar la nueva orden en la base de datos
      await newOrder.save();

      res.status(200).json({
        message: 'Orden creada exitosamente',
        order: newOrder,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = orderController;

/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const Order = require('../models/order.model');

const esRolValido = (rol) => {
  const rolesPermitidos = ['mesero', 'admin', 'cocina'];
  return rolesPermitidos.includes(rol);
};

const orderController = {
  createOrder: async (req, res) => {
    try {
      if (!esRolValido(req.user.rol)) {
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

  getAllOrders: async (req, res) => {
    try {
      if (!esRolValido(req.user.rol)) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
      const orders = await Order.find({ status: false })
        .populate({ path: 'products', select: 'name description' })
        .populate('user', 'name');
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = orderController;

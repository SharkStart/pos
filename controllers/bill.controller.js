/* eslint-disable consistent-return */
const Bill = require('../models/bill.model');
const Order = require('../models/order.model');

const esRolValido = (rol) => {
  const rolesPermitidos = ['cajero', 'admin', 'mesero'];
  return rolesPermitidos.includes(rol);
};

const billController = {
  createBill: async (req, res) => {
    try {
      if (!esRolValido(req.user.rol)) {
        return res
          .status(403)
          .json({ message: 'No tienes permiso para realizar esta acción' });
      }
      const { status, method, orderId } = req.body;

      if (!orderId) {
        return res.status(400).json({ message: 'Debes seleccionar una orden' });
      }

      const order = await Order.findById(orderId)
        .populate('user', 'name')
        .populate({ path: 'products', select: 'name price' });
      if (!order) {
        return res
          .status(404)
          .json({ message: 'No se encontro la orden seleccionada' });
      }
      const newBill = new Bill({
        user: order.user,
        products: order.products,
        status: status || false,
        method,
      });

      await newBill.save();

      res.status(200).json({
        message: 'Factura creada exitosamente',
        data: newBill,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateBill: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const bill = await Bill.findByIdAndUpdate(id, { status }, { new: true });
      res.status(200).json({
        message: 'Factura actualizada exitosamente',
        bill,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteBill: async (req, res) => {
    try {
      const { id } = req.params;
      const bill = await Bill.findByIdAndDelete(id);
      res.status(200).json({
        message: 'Factura eliminada exitosamente',
        bill,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      if (!esRolValido(req.user.rol)) {
        return res
          .status(403)
          .json({ message: 'No tienes permiso para realizar esta acción' });
      }
      const orders = await Order.find({ status: true })
        .populate('user', 'name')
        .populate({ path: 'products', select: 'name price' });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getAllBill: async (req, res) => {
    try {
      if (req.user.rol !== 'admin') {
        return res
          .status(401)
          .json({ message: 'No tienes permisos para acceder a esta ruta' });
      }
      const bills = await Bill.find({})
        .populate('user', 'name')
        .populate({ path: 'products', select: 'name price' });
      res.status(200).json(bills);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = billController;

/* eslint-disable consistent-return */
/* eslint-disable no-constant-condition */
const Product = require('../models/product.model');

const productController = {

  getAllProducts: async (req, res) => {
    try {
      if (req.user.rol !== 'admin' && req.user.rol !== 'mesero') {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
      }
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  getProductById: async (req, res) => {
    try {
      if (req.user.rol !== 'admin' && req.user.rol !== 'mesero') {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
      }
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  createProduct: async (req, res) => {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(401).json({ message: 'No tienes permisos para realizar esta operacion' });
      }
      const {
        name, description, price,
      } = req.body;
      const productCreated = await Product.create({
        name, description, price,
      });
      res.status(200).json({ message: 'Product creado satisfactoriamente', product: productCreated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(401).json({ message: 'No tienes permisos para realizar esta operacion' });
      }
      const { id } = req.params;
      const {
        name, description, price,
      } = req.body;

      // Esperar la resolución de la promesa
      const productUpdated = await Product.findByIdAndUpdate(
        id,
        { name, description, price },
        { new: true },
      );

      // Retornar la respuesta después de que la promesa se haya resuelto
      res.status(200).json({ message: 'Product updated', product: productUpdated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(401).json({ message: 'No tienes permisos para realizar esta operacion' });
      }
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = productController;

/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const userController = {
  createUser: async (req, res) => {
    try {
      const {
        name, email, password, rol,
      } = req.body;
      const newUser = new User({
        name, email, password, rol,
      });
      await newUser.save();
      res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
      const { id } = req.params;
      const {
        name, email, password, rol,
      } = req.body;
      const userUpdated = User.findByIdAndUpdate(
        id,
        {
          name, email, password, rol,
        },
        { new: true },
        // eslint-disable-next-line no-use-before-define
        res.status(200).json({ message: 'User updated', user: userUpdated }),
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
          // eslint-disable-next-line no-underscore-dangle
          id: user._id,
          email: user.email,
          rol: user.rol,
        }, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Authentication successful', token });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = userController;

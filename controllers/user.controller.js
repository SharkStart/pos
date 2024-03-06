// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
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

};

module.exports = userController;

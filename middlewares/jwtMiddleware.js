/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const tokenJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: 'No autorizado',
        });
      }
      req.user = user;
      next();
    });
  }
};

module.exports = tokenJWT;

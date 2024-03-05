const express = require('express')
const { encryptPass } = require('../middlewares/authMiddleware')
const UserController = require('../controllers/user.controller')

const router = express.Router();

router.get('/', (req, res) => {
  res.send('saludando desde user router');
});


module.exports = router;
const express = require('express');
const tokenJWT = require('../middlewares/jwtMiddleware');

const router = express.Router();

router.get('/', tokenJWT, )


module.exports = router;
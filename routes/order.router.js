const express = require('express');
const tokenJWT = require('../middlewares/jwtMiddleware');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.post('/', tokenJWT, orderController.createOrder);
router.get('/', tokenJWT, orderController.getAllOrders);
router.put('/:id', tokenJWT, orderController.updateOrder);
router.delete('/:id', tokenJWT, orderController.deleteOrder);

module.exports = router;

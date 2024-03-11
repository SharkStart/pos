const express = require('express');
const tokenJWT = require('../middlewares/jwtMiddleware');
const billController = require('../controllers/bill.controller');

const router = express.Router();

router.post('/', tokenJWT, billController.createBill);
router.get('/', tokenJWT, billController.getAllOrders);
router.put('/:id', tokenJWT, billController.updateBill);
router.delete('/:id', tokenJWT, billController.deleteBill);
router.get('/resume', tokenJWT, billController.getAllBill);

module.exports = router;

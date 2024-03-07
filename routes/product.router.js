const express = require('express');
const tokenJWT = require('../middlewares/jwtMiddleware');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', tokenJWT, productController.getAllProducts);
router.post('/', tokenJWT, productController.createProduct);
router.get('/:id', tokenJWT, productController.getProductById);
router.put('/:id', tokenJWT, productController.updateProduct);
router.delete('/:id', tokenJWT, productController.deleteProduct);

module.exports = router;

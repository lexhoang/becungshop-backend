const express = require('express');
const { ProductMiddleware } = require('../middlewares/ProductMiddleware');

const ProductRouter = express.Router();
ProductRouter.use(ProductMiddleware);

const { createProduct, getAllProduct } = require('../controllers/ProductController');

ProductRouter.post('/products', createProduct);
ProductRouter.get('/products', getAllProduct);

module.exports = ProductRouter;
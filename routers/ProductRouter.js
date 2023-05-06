const express = require('express');

const ProductRouter = express.Router();

const { createProduct, getAllProduct } = require('../controllers/ProductController');

ProductRouter.post('/products', createProduct);
ProductRouter.get('/products', getAllProduct);

module.exports = ProductRouter;
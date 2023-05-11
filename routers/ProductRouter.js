const express = require('express');
const { ProductMiddleware } = require('../middlewares/ProductMiddleware');

const ProductRouter = express.Router();
ProductRouter.use(ProductMiddleware);

const { createProduct, getAllProduct, getProductById, updateProductById ,deleteProductById} = require('../controllers/ProductController');

ProductRouter.post('/products', createProduct);
ProductRouter.get('/products', getAllProduct);
ProductRouter.get('/products/:id', getProductById);
ProductRouter.put('/products/:id', updateProductById);
ProductRouter.delete('/products/:id', deleteProductById);

module.exports = ProductRouter;
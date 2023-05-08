const express = require('express');

const ProductForRouter = express.Router();

const { ProductForMiddleware } = require('../middlewares/ProductForMiddleware')

ProductForRouter.use(ProductForMiddleware)

const { createProductFor, getAllProductFor, getProductForById, updateProductFor, deleteProductFor } = require('../controllers/ProductForController');

ProductForRouter.post('/productfor', createProductFor);
ProductForRouter.get('/productfor', getAllProductFor);
ProductForRouter.get('/productfor/:id', getProductForById);
ProductForRouter.put('/productfor/:id', updateProductFor);
ProductForRouter.delete('/productfor/:id', deleteProductFor);

module.exports = ProductForRouter;
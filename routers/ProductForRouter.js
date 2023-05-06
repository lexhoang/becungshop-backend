const express = require('express');

const ProductForRouter = express.Router();

const { createProductFor, getAllProductFor } = require('../controllers/ProductForController');

ProductForRouter.post('/product-for', createProductFor);
ProductForRouter.get('/product-for', getAllProductFor);

module.exports = ProductForRouter;
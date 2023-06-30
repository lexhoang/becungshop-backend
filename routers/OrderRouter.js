const express = require('express');

const OrderRouter = express.Router();

const { OrderMiddleware } = require('../middlewares/OrderMiddleware')

OrderRouter.use(OrderMiddleware)

const { createOrder, getAllOrder, getOrderById, updateOrderById, deleteOrderById } = require('../controllers/OrderController');

OrderRouter.post('/orders', createOrder);
OrderRouter.get('/orders', getAllOrder);
OrderRouter.get('/orders/:id', getOrderById);
OrderRouter.put('/orders/:id', updateOrderById);
OrderRouter.patch('/orders/:id', updateOrderById);
OrderRouter.delete('/orders/:id', deleteOrderById);

module.exports = OrderRouter;
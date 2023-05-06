const express = require('express');

const { TypeMiddleware } = require('../middlewares/TypesMiddleware');

const TypesRouter = express.Router();

TypesRouter.use(TypeMiddleware);

const { createType, getAllTypes } = require('../controllers/TypesController');


TypesRouter.post('/types', createType);
TypesRouter.get('/types', getAllTypes);

module.exports = TypesRouter;

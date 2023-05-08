const express = require('express');

const { TypeMiddleware } = require('../middlewares/TypesMiddleware');

const TypesRouter = express.Router();

TypesRouter.use(TypeMiddleware);

const { createType, getAllTypes, getTypeById, updateTypeById,deleteTypeById } = require('../controllers/TypesController');


TypesRouter.post('/types', createType);
TypesRouter.get('/types', getAllTypes);
TypesRouter.get('/types/:id', getTypeById);
TypesRouter.put('/types/:id', updateTypeById);
TypesRouter.delete('/types/:id', deleteTypeById);

module.exports = TypesRouter;

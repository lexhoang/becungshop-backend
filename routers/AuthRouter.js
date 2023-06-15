const express = require('express');

const { AuthMiddleware } = require('../middlewares/AuthMiddleware');

const AuthRouter = express.Router();

AuthRouter.use(AuthMiddleware);

const { createAuth, getAllAuth, getAuthById, updateAuthById, deleteAuthById } = require('../controllers/AuthController');

AuthRouter.post('/auths', createAuth);
AuthRouter.get('/auths', getAllAuth);
AuthRouter.get('/auths/:id', getAuthById);
AuthRouter.put('/auths/:id', updateAuthById);
AuthRouter.patch('/auths/:id', updateAuthById);
AuthRouter.delete('/auths/:id', deleteAuthById);

module.exports = AuthRouter;
const express = require('express');

const { UserMiddleware } = require('../middlewares/UserMiddleware');

const UserRouter = express.Router();

UserRouter.use(UserMiddleware);

const { createUser, getAllUser, deleteUserById } = require('../controllers/UserController');

UserRouter.post('/users', createUser);
UserRouter.get('/users', getAllUser);
UserRouter.delete('/users/:id', deleteUserById);

module.exports = UserRouter;
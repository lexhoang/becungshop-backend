const express = require('express');

const { UserMiddleware } = require('../middlewares/UserMiddleware');

const UserRouter = express.Router();

UserRouter.use(UserMiddleware);

const { createUser, getAllUser, getUserById, updateUserById, deleteUserById } = require('../controllers/UserController');

UserRouter.post('/users', createUser);
UserRouter.get('/users', getAllUser);
UserRouter.get('/users/:id', getUserById);
UserRouter.put('/users/:id', updateUserById);
UserRouter.patch('/users/:id', updateUserById);
UserRouter.delete('/users/:id', deleteUserById);

module.exports = UserRouter;
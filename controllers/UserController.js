const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');

const createUser = async (req, res) => {
    let bodyRequest = req.body;

    let createNewUser = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        photoUrl: bodyRequest.photoUrl,
        account: bodyRequest.account,
        password: bodyRequest.password,
        name: bodyRequest.name,
        phone: bodyRequest.phone,
        active: bodyRequest.active,
        cart: bodyRequest.cart
    });

    try {
        const user = await UserModel.create(createNewUser)

        return res.status(200).json({
            status: "Success: Create User successfully",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message,
        });
    }
}


const getAllUser = async (req, res) => {
    try {
        const { name, account, phone } = req.query;
        const condition = {};

        if (name) {
            const regex = new RegExp(`${name}`);
            condition.name = regex;
        }

        if (account) {
            const regex = new RegExp(`${account}`);
            condition.account = regex;
        }

        if (phone) {
            condition.phone = phone;
        }

        let limit = req.query.limit;
        let skip = req.query.skip;

        const user = await UserModel.find(condition)
            .limit(limit)
            .skip(skip)
            .exec()

        return res.status(200).json({
            status: "Success: Get All User successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message
        })
    }
}


const getUserById = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not a valid",
        });
    }

    try {
        const user = await UserModel.findById(id);

        return res.status(200).json({
            status: "Success: Get User By ID successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message,
        });
    }
}


const updateUserById = async (req, res) => {
    let id = req.params.id;
    let bodyRequest = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not a valid",
        });
    }

    let updateUser = {
        photoUrl: bodyRequest.photoUrl,
        account: bodyRequest.account,
        password: bodyRequest.password,
        name: bodyRequest.name,
        phone: bodyRequest.phone,
        active: bodyRequest.active,
        cart: bodyRequest.cart
    }
    try {
        const user = await UserModel.findByIdAndUpdate(id, updateUser)

        return res.status(200).json({
            status: "Success: Update user By ID successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message,
        });
    }
}


const deleteUserById = (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not a valid",
        });
    }

    UserModel.findByIdAndDelete(id)
        .then((data) => {
            return res.status(200).json({
                status: "Success: Delete User By ID successfully",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message,
            });
        })
}

module.exports = { createUser, getAllUser, getUserById, updateUserById, deleteUserById }
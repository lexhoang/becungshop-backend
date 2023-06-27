const mongoose = require('mongoose');
const AuthModel = require('../models/AuthModel');

const createAuth = async (req, res) => {
    let bodyRequest = req.body;

    let createNewAuth = new AuthModel({
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
        // const auth = await AuthModel.create(createNewAuth)
        await createNewAuth.save();
        return res.status(200).json({
            status: "Success: Create auth successfully",
            data: createNewAuth
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message,
        });
    }
}


const getAllAuth = async (req, res) => {
    try {
        const { account } = req.query;
        const condition = {};

        if (account) {
            const regex = new RegExp(`${account}`);
            condition.account = regex;
        }

        // if (phone) {
        //     condition.phone = phone;
        // }

        let limit = parseInt(req.query.limit);
        let skip = parseInt(req.query.skip);

        const totalAuth = await AuthModel.countDocuments();
        const totalPagesAuth = Math.ceil(totalAuth / limit);

        const auth = await AuthModel.find(condition)
            .limit(limit)
            .skip(skip)
            .exec()

        return res.status(200).json({
            status: "Success: Get All auth successfully",
            data: auth,
            totalPagesAuth: totalPagesAuth
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message
        })
    }
}


const getAuthById = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "auth ID is not a valid",
        });
    }

    try {
        const auth = await AuthModel.findById(id);

        return res.status(200).json({
            status: "Success: Get auth By ID successfully",
            data: auth,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message,
        });
    }
}


const updateAuthById = async (req, res) => {
    let id = req.params.id;
    let bodyRequest = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "auth ID is not a valid",
        });
    }

    let updateAuth = {
        photoUrl: bodyRequest.photoUrl,
        account: bodyRequest.account,
        password: bodyRequest.password,
        name: bodyRequest.name,
        phone: bodyRequest.phone,
        active: bodyRequest.active,
        cart: bodyRequest.cart
    }
    try {
        // await AuthModel.findByIdAndUpdate(id, updateAuth);
        // const auth = AuthModel.findById(id)
        const auth = await AuthModel.findByIdAndUpdate(id, updateAuth, { new: true, upsert: true });
        return res.status(200).json({
            status: "Success: Update auth By ID successfully",
            data: auth,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message,
        });
    }
}


const deleteAuthById = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Auth ID is not valid",
        });
    }

    AuthModel.findByIdAndDelete(id)
        .then((data) => {
            return res.status(200).json({
                status: "Success: Delete Auth By ID successfully",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message,
            });
        })
}

module.exports = { createAuth, getAllAuth, getAuthById, updateAuthById, deleteAuthById }
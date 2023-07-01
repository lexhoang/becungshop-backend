const mongoose = require('mongoose');
const OrderModel = require('../models/OrderModel');
const AuthModel = require('../models/AuthModel');

const createOrder = async (req, res) => {
    let bodyRequest = req.body;

    if (!bodyRequest.name) {
        return res.status(400).json({
            status: 'Error 400: Bad Request',
            message: 'Type name is required'
        })
    }

    let createNewOrder = new OrderModel({
        _id: new mongoose.Types.ObjectId(),
        accountID: bodyRequest.accountID,
        accountName: bodyRequest.accountName,
        name: bodyRequest.name,
        phone: bodyRequest.phone,
        address: bodyRequest.address,
        note: bodyRequest.note,
        orderDetail: bodyRequest.orderDetail,
        bill: bodyRequest.bill,
    })

    if (!mongoose.Types.ObjectId.isValid(bodyRequest.accountID)) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Type is not valid!",
        });
    }

    try {
        const authExist = await AuthModel.findOne({ _id: bodyRequest.accountID });
        if (!authExist) {
            return res.status(400).json({
                status: "Error 400: Bad request",
                message: "Type or ProductFor not found!",
            })
        }

        // const id = (await OrderModel.create(createNewOrder))._id
        // const order = await OrderModel.findById(id).populate('accountID');
        await createNewOrder.save()
        createNewOrder.accountID = authExist
        return res.status(200).json({
            status: "Success: Create order successfully",
            data: createNewOrder
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message,
        });
    }
}

const getAllOrder = async (req, res) => {
    try {
        const { accountName, name, phone, address } = req.query;
        const condition = {};

        if (accountName) {
            const regex = new RegExp(accountName, "i");
            condition.accountName = regex;
        }
        if (name) {
            const regex = new RegExp(name, "i");
            condition.name = regex;
        }
        if (phone) {
            condition.phone = phone
        }
        if (address) {
            const regex = new RegExp(address, "i");
            condition.address = regex;
        }

        let limit = parseInt(req.query.limit);
        let skip = parseInt(req.query.skip);

        const totalOrder = await OrderModel.countDocuments(); // Đếm tổng số sản phẩm
        const totalPages = Math.ceil(totalOrder / limit); // Tính toán số trang cần thiết

        const order = await OrderModel.find(condition)
            .populate('accountID')
            .limit(limit)
            .skip(skip)
            .exec()

        return res.status(200).json({
            status: "Success: Get All Order successfully",
            data: order,
            totalPages: totalPages
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message
        })
    }
}

const getOrderById = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not a valid",
        });
    }

    try {
        const order = await OrderModel.findById(id);

        return res.status(200).json({
            status: "Success: Get Order By ID successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message,
        });
    }
}

const updateOrderById = async (req, res) => {
    let id = req.params.id;
    let bodyRequest = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not a valid",
        });
    }
    let editOrder = {
        accountID: bodyRequest.accountID,
        accountName: bodyRequest.accountName,
        name: bodyRequest.name,
        phone: bodyRequest.phone,
        address: bodyRequest.address,
        note: bodyRequest.note,
        orderDetail: bodyRequest.orderDetail,
        bill: bodyRequest.bill,
    }

    try {
        // await OrderModel.findByIdAndUpdate(id, editOrder);
        // const order = OrderModel.findById(id).populate('accountID')
        const order = await OrderModel.findByIdAndUpdate(id, editOrder, { new: true, upsert: true }).populate('accountID');
        return res.status(200).json({
            status: "Success: Update Order By Id successfully",
            data: order
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message
        })
    }
}


const deleteOrderById = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Order ID is not a valid",
        });
    }

    OrderModel.findByIdAndDelete(id)
        .then((data) => {
            return res.status(200).json({
                status: "Success: Delete Order By ID successfully",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message,
            });
        })
}
module.exports = { createOrder, getAllOrder, getOrderById, updateOrderById, deleteOrderById }
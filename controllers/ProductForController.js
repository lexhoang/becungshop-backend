const mongoose = require('mongoose');
const ProductForModel = require('../models/ProductForModel');

const createProductFor = (req, res) => {
    let bodyRequest = req.body;

    if (!bodyRequest.name) {
        return res.status(400).json({
            status: 'Error 400: Bad Request',
            message: 'Type name is required'
        })
    }

    let createNewProductFor = new ProductForModel({
        _id: new mongoose.Types.ObjectId(),
        name: bodyRequest.name,
        description: bodyRequest.description
    })

    ProductForModel.create(createNewProductFor)
        .then((data) => {
            return res.status(200).json({
                status: "Success: Create Product For successfully",
                data: data
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: 'Error 500: Internal sever Error',
                message: error.message
            });
        });
}

const getAllProductFor = async (req, res) => {
    try {
        const condition = {};

        const data = await ProductForModel.find(condition);
        return res.status(200).json({
            status: "Success: Get All Product For successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message
        })
    }
}
module.exports = { createProductFor, getAllProductFor }
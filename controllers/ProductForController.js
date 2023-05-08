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
        img: bodyRequest.img,
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

const getProductForById = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Product for ID is not a valid"
        })
    }

    try {
        const productFor = await ProductForModel.findById(id);
        return res.status(200).json({
            status: "Success: Get Product For By ID successfully",
            data: productFor
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message
        })
    }
}

const updateProductFor = async (req, res) => {
    let id = req.params.id;
    let bodyRequest = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Product for ID is not a valid"
        })
    }
    let updateProductFor = {
        img: bodyRequest.img,
        name: bodyRequest.name,
        description: bodyRequest.description
    }

    try {
        const productFor = await ProductForModel.findByIdAndUpdate(id, updateProductFor)
        return res.status(200).json({
            status: "Success: Update Product For By ID successfully",
            data: productFor
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message
        })
    }
}


const deleteProductFor = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Product for ID is not a valid"
        })
    }

    ProductForModel.findByIdAndDelete(id)
        .then((data) => {
            return res.status(200).json({
                status: "Success: Delete Product For By ID successfully",
            })
        })
        .catch((error) => {
            return res.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message
            })
        })
}
module.exports = { createProductFor, getAllProductFor, getProductForById, updateProductFor, deleteProductFor }
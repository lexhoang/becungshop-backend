const mongoose = require('mongoose');

const TypesModel = require('../models/TypesModel');
const ProductForModel = require('../models/ProductForModel');


const createType = async (req, res) => {

    let bodyRequest = req.body;

    if (!bodyRequest.name) {
        return res.status(400).json({
            status: 'Error 400: Bad Request',
            message: 'Type name is required'
        })
    }

    let CreateNewType = new TypesModel({
        _id: new mongoose.Types.ObjectId(),
        name: bodyRequest.name,
        productFor: bodyRequest.productFor,
        description: bodyRequest.description
    });

    if (!mongoose.Types.ObjectId.isValid(bodyRequest.productFor)) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Product for is not valid!",
        });
    }

    try {
        const productForExist = await ProductForModel.findOne({ _id: bodyRequest.productFor })
        if (!productForExist) {
            return res.status(400).json({
                status: "Error 400: Bad request",
                message: "ProductForID not found!",
            })
        }

        const type = await TypesModel.create(CreateNewType)

        return res.status(200).json({
            status: "Success: Create Product Type successfully",
            data: type
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message,
        });
    }
}

// Get All
const getAllTypes = async (req, res) => {
    try {
        //B1: Thu thập dữ liệu
        const { name, productFor } = req.query
        const condition = {};

        if (name) {
            const regex = new RegExp(`${name}`);
            condition.name = regex;
        }

        if (productFor) {
            condition.productFor = productFor
        }

        let limit = req.query.limit;
        let skip = req.query.skip;

        //B2: Validate dữ liệu
        //B3: Thao tác với cơ sở dữ liệu
        const type = await TypesModel.find(condition)
            .populate('productFor')
            .limit(limit)
            .skip(skip)
            .exec()

        return res.status(200).json({
            status: "Success: Get All Product Types successfully",
            data: type
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message
        })
    }
}

module.exports = { createType, getAllTypes }
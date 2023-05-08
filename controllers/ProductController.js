const mongoose = require('mongoose');
const ProductModel = require('../models/ProductsModel');
const TypeModel = require('../models/TypesModel');
const ProductForModel = require('../models/ProductForModel');


const createProduct = async (req, res) => {
    let bodyRequest = req.body;

    let createNewProduct = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        img: bodyRequest.img,
        name: bodyRequest.name,
        productFor: bodyRequest.productFor,
        type: bodyRequest.type,
        amount: bodyRequest.amount,
        prices: bodyRequest.prices,
        color: bodyRequest.color,
        size: bodyRequest.size,
        infoCode: bodyRequest.infoCode,
        infoAge: bodyRequest.infoAge,
        infoWeight: bodyRequest.infoWeight,
        infoMaterial: bodyRequest.infoMaterial,
        infoMadeIn: bodyRequest.infoMadeIn,
        infoDescription: bodyRequest.infoDescription
    });

    if (!mongoose.Types.ObjectId.isValid(bodyRequest.type)) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Type is not valid!",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(bodyRequest.productFor)) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Product for is not valid!",
        });
    }

    try {
        const typeExist = await TypeModel.findOne({ _id: bodyRequest.type });
        const productForExist = await ProductForModel.findOne({ _id: bodyRequest.productFor });
        if (!typeExist || !productForExist) {
            return res.status(400).json({
                status: "Error 400: Bad request",
                message: "TypeID or ProductForID not found!",
            })
        }

        const product = await ProductModel.create(createNewProduct)

        return res.status(200).json({
            status: "Success: Create Product successfully",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message,
        });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { name, productFor, type } = req.query;
        const condition = {};

        if (name) {
            const regex = new RegExp(`${name}`);
            condition.name = regex;
        }
        if (productFor) {
            condition.productFor = productFor
        }
        if (type) {
            condition.type = type;
        }

        let limit = req.query.limit;
        let skip = req.query.skip;

        const product = await ProductModel.find(condition)
            .populate('type')
            .populate('productFor')
            .limit(limit)
            .skip(skip)
            .exec()

        return res.status(200).json({
            status: "Success: Get All Product successfully",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message
        })
    }
}


module.exports = { createProduct, getAllProduct }

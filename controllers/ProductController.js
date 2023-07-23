const mongoose = require('mongoose');
const ProductModel = require('../models/ProductsModel');
const TypeModel = require('../models/TypesModel');


const createProduct = async (req, res) => {
    let bodyRequest = req.body;

    if (!bodyRequest.name) {
        return res.status(400).json({
            status: 'Error 400: Bad Request',
            message: 'Product name is required'
        })
    }

    let createNewProduct = new ProductModel({
        _id: new mongoose.Types.ObjectId(),
        photoUrl: bodyRequest.photoUrl,
        name: bodyRequest.name,
        productFor: bodyRequest.productFor,
        type: bodyRequest.type,
        amount: bodyRequest.amount,
        prices: bodyRequest.prices,
        color: bodyRequest.color,
        size: bodyRequest.size,
        infoCode: bodyRequest.infoCode,
        infoMinAge: bodyRequest.infoMinAge,
        infoMaxAge: bodyRequest.infoMaxAge,
        infoMinWeight: bodyRequest.infoMinWeight,
        infoMaxWeight: bodyRequest.infoMaxWeight,
        infoMaterial: bodyRequest.infoMaterial,
        infoMadeIn: bodyRequest.infoMadeIn,
        description: bodyRequest.description
    });

    if (!mongoose.Types.ObjectId.isValid(bodyRequest.type)) {
        return res.status(400).json({
            status: "Error 400: Bad request",
            message: "Type is not valid!",
        });
    }

    try {
        const typeExist = await TypeModel.findOne({ _id: bodyRequest.type });
        if (!typeExist) {
            return res.status(400).json({
                status: "Error 400: Bad request",
                message: "Type or ProductFor not found!",
            })
        }

        // const id = (await ProductModel.create(createNewProduct))._id
        // const product = await ProductModel.findById(id).populate('type');
        await createNewProduct.save()
        createNewProduct.type = typeExist
        return res.status(200).json({
            status: "Success: Create Product successfully",
            data: createNewProduct
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
        const { name, infoCode, productFor, type } = req.query;
        const condition = {};

        if (name) {
            const regex = new RegExp(name, "i");
            condition.name = regex;
        }
        if (infoCode) {
            const regex = new RegExp(infoCode, "i");
            condition.infoCode = regex;
        }
        if (productFor) {
            condition.productFor = productFor
        }
        if (type) {
            condition.type = type;
        }

        let limit = parseInt(req.query.limit);
        let skip = parseInt(req.query.skip);

        let totalProducts;
        let totalPages;

        if (name || infoCode || productFor || type) {
            // Đếm tổng số sản phẩm phù hợp với điều kiện tìm kiếm
            totalProducts = await ProductModel.countDocuments(condition);
            totalPages = Math.ceil(totalProducts / limit);
        } else {
            // Nếu không có điều kiện tìm kiếm, lấy dữ liệu như cũ
            totalProducts = await ProductModel.countDocuments({});
            totalPages = Math.ceil(totalProducts / limit);
        }

        const product = await ProductModel.find(condition)
            .populate('type')
            .limit(limit)
            .skip(skip)
            .exec()

        return res.status(200).json({
            status: "Success: Get All Product successfully",
            data: product,
            totalPages: totalPages
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message
        })
    }
}


const getProductById = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Product ID is not a valid",
        });
    }

    try {
        const product = await ProductModel.findById(id);

        return res.status(200).json({
            status: "Success: Get Product By ID successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message,
        });
    }
}

const updateProductById = async (req, res) => {
    let id = req.params.id;
    let bodyRequest = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Product ID is not a valid",
        });
    }
    let editProduct = {
        photoUrl: bodyRequest.photoUrl,
        name: bodyRequest.name,
        productFor: bodyRequest.productFor,
        type: bodyRequest.type,
        amount: bodyRequest.amount,
        prices: bodyRequest.prices,
        color: bodyRequest.color,
        size: bodyRequest.size,
        infoCode: bodyRequest.infoCode,
        infoMinAge: bodyRequest.infoMinAge,
        infoMaxAge: bodyRequest.infoMaxAge,
        infoMinWeight: bodyRequest.infoMinWeight,
        infoMaxWeight: bodyRequest.infoMaxWeight,
        infoMaterial: bodyRequest.infoMaterial,
        infoMadeIn: bodyRequest.infoMadeIn,
        description: bodyRequest.description
    }

    try {
        // await ProductModel.findByIdAndUpdate(id, editProduct);
        // const product = await ProductModel.findById(id).populate('type')
        const product = await ProductModel.findByIdAndUpdate(id, editProduct, { new: true, upsert: true }).populate('type');
        return res.status(200).json({
            status: "Success: Update Product By Id successfully",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Internal sever Error",
            message: error.message
        })
    }
}

const deleteProductById = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Product ID is not a valid",
        });
    }

    ProductModel.findByIdAndDelete(id)
        .then((data) => {
            return res.status(200).json({
                status: "Success: Delete Product By ID successfully",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message,
            });
        })
}

module.exports = { createProduct, getAllProduct, getProductById, updateProductById, deleteProductById }

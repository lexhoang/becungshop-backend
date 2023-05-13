const mongoose = require('mongoose');

const TypesModel = require('../models/TypesModel');


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
        photoUrl: bodyRequest.photoUrl,
        name: bodyRequest.name,
        description: bodyRequest.description
    });


    try {
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
        const { name } = req.query
        const condition = {};

        if (name) {
            const regex = new RegExp(`${name}`);
            condition.name = regex;
        }

        let limit = req.query.limit;
        let skip = req.query.skip;

        //B2: Validate dữ liệu
        //B3: Thao tác với cơ sở dữ liệu
        const type = await TypesModel.find(condition)
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


const getTypeById = async (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Type ID is not a valid",
        });
    }

    try {
        const type = await TypesModel.findById(id);

        return res.status(200).json({
            status: "Success: Get Type By ID successfully",
            data: type,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message,
        });
    }
}

const updateTypeById = async (req, res) => {
    let id = req.params.id;
    let bodyRequest = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Type ID is not a valid",
        });
    }

    let editType = {
        photoUrl: bodyRequest.photoUrl,
        name: bodyRequest.name,
        description: bodyRequest.description
    }
    try {
        const type = await TypesModel.findByIdAndUpdate(id, editType)

        return res.status(200).json({
            status: "Success: Update Type By ID successfully",
            data: type,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error 500: Bad Request",
            message: error.message,
        });
    }
}

const deleteTypeById = (req, res) => {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "Error 400: Bad Request",
            message: "Type ID is not a valid",
        });
    }

    TypesModel.findByIdAndDelete(id)
        .then((data) => {
            return res.status(200).json({
                status: "Success: Delete Type By ID successfully",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "Error 500: Bad Request",
                message: error.message,
            });
        })
}
module.exports = { createType, getAllTypes, getTypeById, updateTypeById, deleteTypeById }
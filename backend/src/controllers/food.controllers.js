const foodModel = require('../models/food.model');
const likesModel = require('../models/likes.model');
const savedModel = require('../models/save.model');
const storageService = require('../services/storage.service');
const { v4:uuid } = require('uuid')

const addFood = async (req,res) => {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodpartner: req.foodpartner._id
    })

    await foodItem.save();

    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })
}

const getFood = async (req,res) => {
    const foodItem = await foodModel.find({});
    res.status(200).json({
        message: "Food item fetched successfully",
        foodItem
    })
}

const likeFood = async (req, res) => {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyliked = await likesModel.findOne({ 
        user: user._id,
        food: foodId 
    });

    if (isAlreadyliked) {
        await likesModel.deleteOne({ 
            user: user._id,
            food: foodId
         });
         await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
         return res.status(200).json({ message: "Food unliked successfully" });
    }



    const like = await likesModel.create({
        user: user._id,
        food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

    res.status(201).json({
        message: "Food liked successfully",
        like
    });
}

const saveFood = async (req, res) => {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await savedModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isAlreadySaved) {
        await savedModel.deleteOne({
            user: user._id,
            food: foodId
        });
        return res.status(200).json({ message: "Food unsaved successfully" });
    }

    const saved = await savedModel.create({
        user: user._id,
        food: foodId
    });

    res.status(201).json({
        message: "Food saved successfully",
        saved
    });
}

module.exports = { addFood,getFood, likeFood, saveFood } 
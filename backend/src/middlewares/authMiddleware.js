const foodpartnerModel = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authFoodPartnerMiddleware(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodpartner = await foodpartnerModel.findById(decoded.id);
        req.foodpartner = foodpartner;
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }
}

async function authUserMiddleware(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }
}

module.exports = {authFoodPartnerMiddleware,authUserMiddleware};
const userModel = require('../models/user.model');
const foodpartnerModel = require('../models/foodpartner.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const registerUser = async (req,res) => {
    const { fullname,email,password } = req.body;

    const ExistingUser = await userModel.findOne({
        email
    })

    if(ExistingUser){
        return res.status(400).json({
            message: "User Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullname,
        email,
        password:hashedPassword 
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET);

    res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.status(201).json({
        message: "User registered Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })
}

const loginUser = async (req,res) => {
    const { email,password } = req.body;;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password);

    if(!isPasswordvalid){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(200).json({
        message: "User logged successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })
}

const logoutUser = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logout Successfully"
    })
}

const foodpartnerRegister = async (req,res) => {
    const { fullname, email, password,contactName,phone,address } = req.body;

    const ExistingUser = await foodpartnerModel.findOne({
        email
    })

    if(ExistingUser){
        return res.status(400).json({
            message: "Food Partner already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodpartner = await foodpartnerModel.create({
        fullname,
        email,
        password:hashedPassword,
        contactName,
        phone,
        address
    })

    const token = jwt.sign({
        id:foodpartner._id,
    },process.env.JWT_SECRET);

    res.cookie("token",token)

    res.status(201).json({
        message: "Food Partner registered Successfully",
        foodpartner: {
            _id: foodpartner._id,
            email: foodpartner.email,
            fullname: foodpartner.fullname,
            contactName: foodpartner.contactName,
            phone: foodpartner.phone,
            address: foodpartner.address 
        }
    })
}

const foodpartnerLogin = async (req,res) => {
    const { email,password } = req.body;

    const ExistingUser = await foodpartnerModel.findOne({
        email
    })

    if(!ExistingUser){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const isMatchpassword = await bcrypt.compare(password, ExistingUser.password);

    if(!isMatchpassword){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: ExistingUser._id
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(200).json({
        message: "Food partner logged successfully",
        foodpartner: {
            _id: ExistingUser._id,
            email: ExistingUser.email,
            fullname: ExistingUser.fullname
        }
    })
    
}

const foodpartnerLogout = async (req,res) => {
    res.clearCookie("token","");
    res.status(200).json({
        message: "Food Partner logout Successfully"
    })
}

module.exports = { registerUser,loginUser,logoutUser,
    foodpartnerLogin,foodpartnerLogout,foodpartnerRegister }
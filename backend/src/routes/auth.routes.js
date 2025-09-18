const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers')

//user authentication
router.post('/user/register',authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);

//food partner authentication
router.post('/food-partner/register', authController.foodpartnerRegister);
router.post('/food-partner/login', authController.foodpartnerLogin);
router.get('/food-partner/logout', authController.foodpartnerLogout);

module.exports = router;
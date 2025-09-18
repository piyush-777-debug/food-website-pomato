const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const foodController = require('../controllers/food.controllers')
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/',authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
     foodController.addFood);

router.get('/',authMiddleware.authUserMiddleware, foodController.getFood)

router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFood)

router.post('/save', authMiddleware.authUserMiddleware, foodController.saveFood)

module.exports = router;
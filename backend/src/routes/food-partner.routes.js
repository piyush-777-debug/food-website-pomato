const Express = require('express');
const router = Express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const foodPartnerController = require('../controllers/foodpartner.controllers');

router.get('/:id',authMiddleware.authUserMiddleware, foodPartnerController.getFoodPartnerById)

module.exports = router;
const foodpartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {   
  try {
    const foodpartnerId = req.params.id;

    const foodPartner = await foodpartnerModel.findById(foodpartnerId);
    if (!foodPartner) {
      return res.status(404).json({ message: 'Food Partner not found' });
    }

    const foodItemsByFoodPartner = await foodModel.find({ foodpartner: foodpartnerId });

    return res.status(200).json({
      message: 'Food Partner fetched successfully',
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner
      }
    });
  } catch (error) {
    console.error("Error in getFoodPartnerById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getFoodPartnerById
};

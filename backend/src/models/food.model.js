const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    foodpartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodPartner"
    },
    likeCount: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Food",foodSchema);


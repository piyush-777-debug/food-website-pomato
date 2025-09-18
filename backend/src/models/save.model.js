const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("Saved", saveSchema);

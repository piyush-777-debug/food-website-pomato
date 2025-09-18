const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Mongodb connected");
    })
    .catch(()=>{
        console.log("not connected to database");
    })
}

module.exports = connectDB;
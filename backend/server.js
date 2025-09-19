require('dotenv').config();

const app = require('./src/app')
const connectDB = require('./src/db/db')
const imagekit = require("./src/services/storage.service.js");

connectDB();

app.get("/",(req,res)=>{
    res.send({
        activeStatus:true,
        message:"Server is running",
        error:false
    })
})

app.listen(3000,()=>{
    console.log("Running");
})
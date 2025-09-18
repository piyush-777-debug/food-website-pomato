require('dotenv').config();

const app = require('./src/app')
const connectDB = require('./src/db/db')
const imagekit = require("./src/services/storage.service.js");

connectDB();

app.listen(3000,()=>{
    console.log("Running");
})
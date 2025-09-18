const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const authRoutes = require('../src/routes/auth.routes')
const foodRoutes = require('../src/routes/food.routes')
const foodPartnerRoutes = require('../src/routes/food-partner.routes')
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/food-partner',foodPartnerRoutes);

module.exports = app;
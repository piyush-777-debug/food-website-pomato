import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import ChooseRegister from '../pages/auth/ChooseRegister'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import SavedPage from '../pages/general/SavedPage'

const AppRoutes = () => {
  return (
    <div>
        <Router>
            <Routes>
              <Route path="/" element={<ChooseRegister/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/user/register" element={<UserRegister/>} />
            <Route path="/user/login" element={<UserLogin/>} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister/>} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin/>} />
            <Route path="/create-food" element={<CreateFood/>} />
            <Route path="/food-partner/:id" element={<Profile/>} />
            <Route path="/saved" element={<SavedPage/>} />
            </Routes>
        </Router>
    </div>
  )
}

export default AppRoutes
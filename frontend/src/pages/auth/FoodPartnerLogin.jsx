import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const FoodPartnerLogin = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/food-partner/login', {
      email,
      password
    },{
      withCredentials: true
    })
    navigate("/create-food");

  }
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Welcome Back</h2>
        <p className="form-subtitle">Please fill in the details below</p>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" placeholder="Enter your email" name='email' required />
          </label>

          <label>
            Password
            <input type="password" placeholder="Enter password" name='password' required />
          </label>

          <button type="submit" className="submit-btn">
            Sign in 
          </button>

          <p className="form-footer">
            Don't have an account? <Link to = "/food-partner/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
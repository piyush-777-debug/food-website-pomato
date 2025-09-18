import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const FoodPartnerRegister = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const response = await axios.post('http://localhost:3000/api/auth/food-partner/register', {
      fullname,
      email,
      contactName,
      phone,
      password,
      address
    },{
      withCredentials: true
    })
    navigate("/create-food");
  }
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Partner Account</h2>
        <p className="form-subtitle">Please fill in the details below</p>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input type="text" placeholder="Enter your name" name='fullname' required />
          </label>

          <label>
            Email Address
            <input type="email" placeholder="Enter your email" name='email' required />
          </label>

          <label>
            Contact Name
            <input type="text" placeholder="Enter your Business Name" name='contactName' required />
          </label>

          <label>
            Phone
            <input type="text" placeholder="Enter your Phone" name='phone' required />
          </label>

          <label>
            Address
            <input type="text" placeholder="Enter your Address" name='address' required />
          </label>

          <label>
            Password
            <input type="password" placeholder="Enter password" name='password' required />
          </label>

          <button type="submit" className="submit-btn">
            Register
          </button>

          <p className="form-footer">
            Already have an account? <Link to = '/food-partner/login'>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
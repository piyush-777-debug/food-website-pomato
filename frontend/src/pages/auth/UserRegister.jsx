import React from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserRegister = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post('https://food-website-pomato-server.vercel.app/api/auth/user/register', {
      fullname,
      email,
      password
    },{
      withCredentials: true
    })
    navigate("/home");
  }

  return (
  <div className="form-wrapper">
        <div className="form-container">
          <h2>Create an Account</h2>
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
              Password
              <input type="password" placeholder="Enter password" name='password' required />
            </label>

            <button type="submit" className="submit-btn">
              Register
            </button>

            <p className="form-footer">
              Already have an account? <Link to = '/user/login'>Login here</Link>
            </p>
          </form>
        </div>
      </div>
  );
  };
export default UserRegister;
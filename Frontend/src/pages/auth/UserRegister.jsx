import React from "react";
import { Link } from "react-router-dom";
import "../../styles/shared.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const phoneNumber = e.target.phone.value;
    const password = e.target.password.value;

    await axios.post(
      "http://localhost:3000/api/auth/user/register",
      {
        fullName,
        email,
        phoneNumber,
        password,
      },
      {
        withCredentials: true,
      }
    );

    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🍽️</div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join Eatoz and discover amazing food</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/user/login" className="auth-link">
              Sign in here
            </Link>
          </p>
          <p className="auth-footer-text">
            Are you a food partner?{" "}
            <Link to="/food-partner/register" className="auth-link">
              Register as partner
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;

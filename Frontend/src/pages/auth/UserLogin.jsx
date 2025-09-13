import React from "react";
import { Link } from "react-router-dom";
import "../../styles/shared.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    await axios.post(
      "http://localhost:3000/api/auth/user/login",
      {
        email,
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
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your Eatoz account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div
            className="form-group"
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "var(--text-secondary)",
              }}
            >
              <input type="checkbox" name="rememberMe" style={{ margin: 0 }} />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="auth-link"
              style={{ fontSize: "14px" }}
            >
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/user/register" className="auth-link">
              Create one here
            </Link>
          </p>
          <p className="auth-footer-text">
            Are you a food partner?{" "}
            <Link to="/food-partner/login" className="auth-link">
              Partner login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/shared.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const buisnessName = e.target.buisnessName.value;
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const phoneNumber = e.target.phoneNumber.value;
    const address = e.target.address.value;
    const cuisineType = e.target.cuisineType.value;
    const password = e.target.password.value;

    try {
      await axios.post(
        "http://localhost:3000/api/auth/foodPartner/register",
        {
          buisnessName,
          fullName,
          email,
          phoneNumber,
          address,
          cuisineType,
          password,
        },
        {
          withCredentials: true,
        }
      );

      navigate("/create-food");
    } catch (error) {
      alert(
        "Registration failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🏪</div>
          <h1 className="auth-title">Partner Registration</h1>
          <p className="auth-subtitle">
            Join Eatoz as a food partner and grow your business
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="buisnessName" className="form-label">
              Business Name
            </label>
            <input
              type="text"
              id="buisnessName"
              name="buisnessName"
              className="form-input"
              placeholder="Enter your business name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Owner Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              placeholder="Enter owner's full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Business Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter business email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="form-input"
              placeholder="Enter contact number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Business Address
            </label>
            <textarea
              id="address"
              name="address"
              className="form-input"
              placeholder="Enter your business address"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cuisineType" className="form-label">
              Cuisine Type
            </label>
            <select
              id="cuisineType"
              name="cuisineType"
              className="form-input"
              required
            >
              <option value="">Select cuisine type</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="thai">Thai</option>
              <option value="continental">Continental</option>
              <option value="fast-food">Fast Food</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
              <option value="other">Other</option>
            </select>
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

          <div className="form-group">
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "14px",
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                name="terms"
                style={{ marginTop: "2px" }}
                required
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="auth-link">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="auth-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button type="submit" className="auth-button">
            Register as Partner
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Already a partner?{" "}
            <Link to="/food-partner/login" className="auth-link">
              Sign in here
            </Link>
          </p>
          <p className="auth-footer-text">
            Looking to order food?{" "}
            <Link to="/user/register" className="auth-link">
              Register as customer
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;

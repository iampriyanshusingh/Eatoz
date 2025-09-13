import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../general/Home";
import CreateFood from "../general/CreateFood";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* User Authentication Routes */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        {/* Food Partner Authentication Routes */}
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

        {/* Default redirect to user login */}
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/user/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

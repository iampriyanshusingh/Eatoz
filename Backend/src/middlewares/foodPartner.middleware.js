const foodPartnerModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");

module.exports.authFoodPartner = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodPartnerModel.findById(decoded._id);

    req.foodPartner = foodPartner;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

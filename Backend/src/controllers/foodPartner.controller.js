const foodPartnerModel = require("../models/foodPartner.model");
const { validationResult } = require("express-validator");

module.exports.registerFoodPartner = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const {
    buisnessName,
    fullName,
    email,
    phoneNumber,
    address,
    cuisineType,
    password,
  } = req.body;

  const isPartnerExist = await foodPartnerModel.findOne({ email });
  if (isPartnerExist) {
    return res.status(400).json({
      message: "User Already Exist",
    });
  }

  const hashedPassword = await foodPartnerModel.hashedPassword(password);

  const foodPartner = await foodPartnerModel.create({
    buisnessName,
    fullName,
    email,
    phoneNumber,
    address,
    cuisineType,
    password: hashedPassword,
  });

  const token = foodPartner.generateAuthToken();

  return res.status(201).json({ token, foodPartner });
};

module.exports.loginFoodPartner = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  const foodPartner = await foodPartnerModel
    .findOne({ email })
    .select("+password");
  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const comparePassword = await foodPartner.comparePassword(password);
  if (!comparePassword) {
    return res.status(400).json({
      message: "invalid Credentials",
    });
  }

  const token = foodPartner.generateAuthToken();
  res.cookie("token", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  res.status(200).json({ token, foodPartner });
};

module.exports.logoutFoodPartner = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  res.cookie("token", token, {
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    message: "Logout Successfull",
  });
};

module.exports.getFoodPartnerById = async (req, res, next) => {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId);
  const foodItemsByFoodPartner = await foodModel.find({
    foodPartner: foodPartnerId,
  });

  if (!foodPartner) {
    return res.status(404).json({ message: "Food partner not found" });
  }

  res.status(200).json({
    message: "Food partner retrieved successfully",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner,
    },
  });
};

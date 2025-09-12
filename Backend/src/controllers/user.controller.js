const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { fullName, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({
      message: "User Already Exist",
    });
  }

  const hashedPassword = await userModel.hashedPassword(password);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  res.status(200).json({ token, user });
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  res.cookie("token", token, {
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    message: "Logout Successfull",
  });
};

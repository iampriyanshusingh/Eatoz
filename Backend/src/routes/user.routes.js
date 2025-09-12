const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");

const router = express.Router();

router.post(
  "/user/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName")
      .isLength({ min: 3, max: 15 })
      .withMessage("Name must be at least 3 character long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long"),
  ],
  userController.registerUser
);

router.post(
  "/user/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Must be 6 character atleast"),
  ],
  userController.loginUser
);

router.get("/user/logout", userMiddleware.authUser, userController.logoutUser);

module.exports = router;

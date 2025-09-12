const express = require("express");
const { body } = require("express-validator");
const foodPartnerController = require("../controllers/foodPartner.controller");
const middlewareFoodPartner = require("../middlewares/foodPartner.middleware");

const router = express.Router();

router.post(
  "/foodPartner/register",
  [
    body("fullName")
      .isLength({ min: 3, max: 10 })
      .withMessage("Name must be 3 length long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long"),
  ],
  foodPartnerController.registerFoodPartner
);

router.post(
  "/foodPartner/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long"),
  ],
  foodPartnerController.loginFoodPartner
);

router.get(
  "/foodPartner/logout",
  middlewareFoodPartner.authFoodPartner,
  foodPartnerController.logoutFoodPartner
);
module.exports = router;

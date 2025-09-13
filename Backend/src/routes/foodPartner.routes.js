const express = require("express");
const { body } = require("express-validator");
const foodPartnerController = require("../controllers/foodPartner.controller");
const middlewareFoodPartner = require("../middlewares/foodPartner.middleware");

const router = express.Router();

const cuisineOptions = [
  "indian",
  "chinese",
  "italian",
  "mexican",
  "thai",
  "continental",
  "fast-food",
  "desserts",
  "beverages",
  "other",
];

router.post(
  "/foodPartner/register",
  [
    body("buisnessName")
      .isLength({ min: 3 })
      .withMessage("Length Should be atleast 3"),
    body("fullName")
      .isLength({ min: 3, max: 50 })
      .withMessage("Name must be 3 length long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long"),
    body("phoneNumber")
      .isMobilePhone("any", { strictMode: false })
      .withMessage("Phone Number Should be valid"),
    body("address")
      .isLength({ min: 3, max: 40 })
      .withMessage("Address should be more accurate"),
    body("cuisineType")
      .isIn(cuisineOptions)
      .withMessage("Invalid cuisine type"),
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

/* /api/food-partner/:id */
router.get(
  "/foodPartner/:id",
  middlewareFoodPartner.authFoodPartner,
  foodPartnerController.getFoodPartnerById
);

module.exports = router;

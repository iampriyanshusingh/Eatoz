const express = require("express");
const { body } = require("express-validator");
const foodController = require("../controllers/food.controller");
const foodPartnerMiddleware = require("../middlewares/foodPartner.middleware");
const userMiddleware = require("../middlewares/user.middleware");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  [body("name").isLength({ min: 3 }).withMessage("Name must be 3 chars long")],
  foodPartnerMiddleware.authFoodPartner,
  upload.single("video"),
  foodController.createFood
);

router.get("/", userMiddleware.authUser, foodController.getFoodItems);

module.exports = router;

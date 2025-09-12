const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

module.exports.createFood = async (req, res, next) => {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({ food: foodItem });
};

module.exports.getFoodItems = async (req, res, next) => {
  const foodItems = await foodModel.find({});
  res.status(200).json({
    message: "Food items fetched Successfully",
    foodItems,
  });
};

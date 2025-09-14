const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const { v4: uuid } = require("uuid");

module.exports.createFood = async (req, res, next) => {
  if (!req.foodPartner) {
    return res.status(401).json({ message: "Unauthorized" });
  }

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

module.exports.likeFood = async (req, res, next) => {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({ message: "foodId is required" });
    }

    // Check if food exists
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const isAlreadyLiked = await likeModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadyLiked) {
      await likeModel.deleteOne({
        user: user._id,
        food: foodId,
      });

      await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: -1 },
      });

      return res.status(200).json({
        message: "Food unliked successfully",
        like: false,
      });
    }

    const like = await likeModel.create({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: 1 },
    });

    res.status(201).json({
      message: "Food liked successfully",
      like: true,
    });
  } catch (error) {
    console.error("Error in likeFood:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.saveFood = async (req, res, next) => {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({ message: "foodId is required" });
    }

    // Check if food exists
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadySaved) {
      await saveModel.deleteOne({
        user: user._id,
        food: foodId,
      });

      await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: -1 },
      });

      return res.status(200).json({
        message: "Food unsaved successfully",
        save: false,
      });
    }

    const save = await saveModel.create({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { savesCount: 1 },
    });

    res.status(201).json({
      message: "Food saved successfully",
      save: true,
    });
  } catch (error) {
    console.error("Error in saveFood:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getSaveFood = async (req, res, next) => {
  const user = req.user;

  const savedFoods = await saveModel.find({ user: user._id }).populate("food");

  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({ message: "No saved foods found" });
  }

  res.status(200).json({
    message: "Saved foods retrieved successfully",
    savedFoods,
  });
};

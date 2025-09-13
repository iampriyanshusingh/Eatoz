const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const foodPartnerSchema = new mongoose.Schema(
  {
    buisnessName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
    },
    cuisineType: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    password: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

foodPartnerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

foodPartnerSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

foodPartnerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const foodPartnerModel = new mongoose.model("foodPartner", foodPartnerSchema);

module.exports = foodPartnerModel;

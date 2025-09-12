const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const foodPartnerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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

//create server
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const foodPartnerRouter = require("./routes/foodPartner.routes");
const foodRouter = require("./routes/food.routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", userRouter);
app.use("/api/auth", foodPartnerRouter);
app.use("/api/food", foodRouter);

module.exports = app;

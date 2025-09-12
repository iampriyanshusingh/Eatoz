//create server
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRouter);

module.exports = app;

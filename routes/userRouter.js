const express = require("express");
const {
  getLoginPage,
  getSignUpPage,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/login", getLoginPage);
userRouter.get("/signup", getSignUpPage);

module.exports = userRouter;

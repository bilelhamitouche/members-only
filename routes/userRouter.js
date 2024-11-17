const express = require("express");
const {
  loginUserGet,
  signUpUserGet,
  signUpUserPost,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/login", loginUserGet);
userRouter.get("/signup", signUpUserGet);
userRouter.post("/signup", signUpUserPost);

module.exports = userRouter;

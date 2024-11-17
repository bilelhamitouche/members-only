const express = require("express");
const passport = require("passport");
const {
  loginUserGet,
  signUpUserGet,
  signUpUserPost,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/login", loginUserGet);
userRouter.get("/signup", signUpUserGet);
userRouter.post("/signup", signUpUserPost);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
);

module.exports = userRouter;

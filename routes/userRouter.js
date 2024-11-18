const express = require("express");
const passport = require("passport");
const {
  loginUserGet,
  signUpUserGet,
  signUpUserPost,
  logoutUserGet,
  becomeMemberGet,
  becomeMemberPost,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/login", loginUserGet);
userRouter.get("/logout", logoutUserGet);
userRouter.get("/signup", signUpUserGet);
userRouter.get("/become-member", becomeMemberGet);
userRouter.post("/become-member", becomeMemberPost);
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

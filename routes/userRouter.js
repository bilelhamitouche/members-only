const express = require("express");
const passport = require("passport");
const {
  loginUserGet,
  signUpUserGet,
  signUpUserPost,
  logoutUserGet,
  becomeMemberGet,
  becomeMemberPost,
  becomeAdminGet,
  becomeAdminPost,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/login", loginUserGet);
userRouter.get("/logout", logoutUserGet);
userRouter.get("/signup", signUpUserGet);
userRouter.get("/become-member", becomeMemberGet);
userRouter.get("/become-admin", becomeAdminGet);
userRouter.post("/become-member", becomeMemberPost);
userRouter.post("/become-admin", becomeAdminPost);
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

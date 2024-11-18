const bcrypt = require("bcrypt");
const db = require("../db/queries");

async function loginUserGet(req, res) {
  res.render("login", { title: "Login", message: req.flash("error") });
}

async function signUpUserGet(req, res) {
  res.render("signup", { title: "Sign up" });
}

async function signUpUserPost(req, res, next) {
  const { firstname, lastname, username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    } else {
      try {
        await db.insertUser(firstname, lastname, username, hashedPassword);
        res.redirect("/users/login");
      } catch (err) {
        return next(err);
      }
    }
  });
}

async function logoutUserGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/users/login");
    }
  });
}

function becomeMemberGet(req, res) {
  res.render("becomeMember", {
    title: "Become member",
    message: req.flash("error"),
  });
}

async function becomeMemberPost(req, res) {
  const id = req.user.id;
  const { password } = req.body;
  if (
    password.toLowerCase() === "lionel messi" ||
    password.toLowerCase() === "cristiano ronaldo"
  ) {
    await db.becomeMember(id);
  } else {
    res.redirect("/users/become-member");
  }
  res.redirect("/posts");
}

module.exports = {
  loginUserGet,
  signUpUserGet,
  signUpUserPost,
  logoutUserGet,
  becomeMemberGet,
  becomeMemberPost,
};

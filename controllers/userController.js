const db = require("../db/queries");

async function getLoginPage(req, res) {
  res.render("login", { title: "Login" });
}

async function getSignUpPage(req, res) {
  res.render("signup", { title: "Sign up" });
}

module.exports = {
  getLoginPage,
  getSignUpPage,
};

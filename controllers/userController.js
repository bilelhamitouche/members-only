const bcrypt = require("bcrypt");
const db = require("../db/queries");

async function loginUserGet(req, res) {
  res.render("login", { title: "Login" });
}

async function signUpUserGet(req, res) {
  res.render("signup", { title: "Sign up" });
}

async function signUpUserPost(req, res, next) {
  const { firstname, lastname, username, password } = req.body;
  console.log(req.body);
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

module.exports = {
  loginUserGet,
  signUpUserGet,
  signUpUserPost,
};

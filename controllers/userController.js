const bcrypt = require("bcrypt");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const emailErr = "must be a valid Email.";
const lengthErr = "must be between 2 and 16 characters";

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 2, max: 16 })
    .withMessage(`First name ${lengthErr}`),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 2, max: 16 })
    .withMessage(`Last name ${lengthErr}`),
  body("username")
    .trim()
    .isEmail()
    .withMessage(`username ${emailErr}`)
    .custom(async (value) => {
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Password must be between 2 and 20 characters"),
  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password confirmation does not match password"),
];

async function loginUserGet(req, res) {
  res.render("login", { title: "Login", message: req.flash("error") });
}

async function signUpUserGet(req, res) {
  res.render("signup", { title: "Sign up", errors: [] });
}

const signUpUserPost = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("signup", { title: "Sign up", errors: errors.array() });
    }
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
  },
];

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
  const passwords = [
    "lionel messi",
    "cristiano ronaldo",
    "ronaldo",
    "messi",
    "cr7",
    "lm10",
  ];
  const id = req.user.id;
  const { password } = req.body;
  if (passwords.includes(password.toLowerCase())) {
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

const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.session());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

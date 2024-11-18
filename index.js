const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const flash = require("connect-flash");
const pool = require("./db/pool");
const indexRouter = require("./routes/indexRouter");
const { passportLocalStrategy } = require("./authentication/passport");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
  }),
);
app.use(flash());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

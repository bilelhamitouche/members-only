const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("./db/queries");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const flash = require("connect-flash");
const pool = require("./db/pool");
const indexRouter = require("./routes/indexRouter");
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

async function verifyCallback(username, password, done) {
  try {
    const user = await db.getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: "Incorrect username, try again!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password, try again!" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

const passportLocalStrategy = new LocalStrategy(verifyCallback);
passport.use(passportLocalStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.getUserById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(flash());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

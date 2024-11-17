const bcrypt = require("bcrypt");
const db = require("../db/queries");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

async function verifyCallback(username, password, done) {
  try {
    const user = await db.getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
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

module.exports = {
  passportLocalStrategy,
};

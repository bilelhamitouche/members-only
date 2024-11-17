const bcrypt = require("bcrypt");
const db = require("../db/queries");
const LocalStrategy = require("passport-local").Strategy;

const passportLocalStrategy = new LocalStrategy(
  async (username, password, done) => {
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
  },
);

module.exports = {
  passportLocalStrategy,
};

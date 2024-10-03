import passport from "passport";
import { Strategy } from "passport-local";
import User from "../../db/models/user.mjs";

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (uid, done) => {
  try {
    const user = await User.findById(uid);

    if (!user) throw new Error("USER_NOT_FOUND_OR_BAD_CREDENTIALS");

    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

export default passport.use(
  new Strategy(
    { usernameField: "name", passwordField: "email" },
    async (name, email, done) => {
      try {
        let user = await User.findOne({ name, email });

        if (!user) {
          user = await User.create({ name, email });
        }

        done(null, user);
      } catch (e) {
        done(e, null);
      }
    }
  )
);

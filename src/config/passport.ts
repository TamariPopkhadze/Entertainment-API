import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport, { Profile } from "passport";
import { Request } from "express";
import { User } from "models";

const createCredentials = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
      },
      function (
        _: Request,
        __: string,
        ___: string,
        profile: Profile,
        done: (error: any, user?: any) => void
      ) {
        try {
          return done(null, profile);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findOne({ id });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
export default createCredentials;

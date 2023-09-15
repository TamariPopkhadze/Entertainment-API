import { getGoogleAccountInfo } from "controllers/passport-controllers";
import express from "express";
import passport from "passport";

const passportRouter = express.Router();

passportRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

passportRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  getGoogleAccountInfo
);

export default passportRouter;
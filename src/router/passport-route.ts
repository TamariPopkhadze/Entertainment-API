import { getGoogleAccountInfo } from "controllers/passport-controllers";
import express from "express";
import passport from "passport";
import {Response , Request} from 'express'

const passportRouter = express.Router();

passportRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);
passportRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});
passportRouter.get("/logout", (req:Request, res:Response) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(process.env.CLIENT_URL!);
    });
  });
  

passportRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  getGoogleAccountInfo
);

export default passportRouter;
function next(err: any): void {
    throw new Error("Function not implemented.");
}


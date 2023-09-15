
import express from "express";
import passport from "passport";
import {Response , Request} from 'express'
import { getGoogleAccountInfo } from "controllers/passport-controllers";

const passportRouter = express.Router();

passportRouter.get(
  "/google",
  passport.authenticate("google", { scope: ['email',"profile"] })
);

passportRouter.get("/login/failed", (_, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
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
  passport.authenticate("google",),
  getGoogleAccountInfo
);

export default passportRouter;
function next(err: any): void {
    throw new Error(err);
}


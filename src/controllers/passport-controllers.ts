import { Request, Response } from "express";
import GoogleUser from "models/googleUser";
import jwt from "jsonwebtoken";

export const getGoogleAccountInfo = async (req: Request, res: Response) => {
  const { user } = req;

  if (user) {
    const { given_name, email, picture } = user;

    const existingUser = await GoogleUser.findOne({ email });

    if (!existingUser){
      await GoogleUser.create({
        name: given_name,
        email: email,
        avatar: picture,
        verify: true,
      });
    }
    const signData: any = {
      name: given_name || "",
    };
    const token = jwt.sign(signData, process.env.JWT_SECRET || "");

    const redirectURL = `https://entertainment-omega.vercel.app/home?token=${token}`;

    return res.redirect(redirectURL);
  }

  return res.status(401).send("Unauthorized");
};

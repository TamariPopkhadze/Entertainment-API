import { Request, Response } from "express";
import { User } from "models";

export const getGoogleAccountInfo = async (req: Request, res: Response) => {
  const { user } = req;

  if (user) {
    const { given_name, email, picture } = user;

    const existingUser = await User.findOne({ email });
    if (!existingUser){
      await User.create({
        name: given_name,
        email: email,
        avatar: picture,
        verify: true,
      });
    }
 

    const redirectURL = `https://entertainment-ld1a.onrender.com/home?name=${given_name}`;

    return res.redirect(redirectURL);
  }

  return res.status(401).send("Unauthorized");
};

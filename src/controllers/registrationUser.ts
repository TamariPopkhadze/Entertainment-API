import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { sendEmailConfirmation } from "mail";
import { createUserSchema } from "schema";
import { EmailVerification, User } from "models";

export const Reigistration = async (req: Request, res: Response) => {
  const { file, body } = req;

  const validator = await createUserSchema({
    ...body,
    avatar: 'https://movies-doxx.onrender.com/users/avatar/' + file?.originalname,
  });

  const { value, error } = validator.validate({
    ...body,
    avatar:'https://movies-doxx.onrender.com/users/avatar/' + file?.originalname,
  });

  if (error) {
    const errorField = error.details[0].context?.key;

    const problem = { field: errorField, message: error.details[0].message };
  
    return res.status(422).json(problem);
  }

  const { name, password, email, avatar, redirectLink } = value;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    name,
    password: hashedPassword,
    email,
    avatar,
    verify: false,
  });

  const verificationHash = crypto.randomBytes(48).toString("hex");

  await EmailVerification.create({
    hash: verificationHash,
    email,
  });
  await sendEmailConfirmation(email, verificationHash, name, redirectLink);

  return res.status(201).json({ message: "new user create successfully" });
};

export const emailVerification = async (req: Request, res: Response) => {
  const { hash } = req.body;
  
  const emailVerification = await EmailVerification.findOne({ hash });

  if (!emailVerification) {
    return res.status(422).json({ message: "No data found" });
  }

  const email = await User.findOne({ email: emailVerification.email });

  if (!email) {
    return res.status(422).json({ message: "No data found" });
  }
  await User.updateOne({ verify: true });

  await EmailVerification.deleteOne({ hash });

  return res.json({ message: "user verified" });
};

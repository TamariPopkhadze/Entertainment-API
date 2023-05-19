import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
// import jwt from "jsonwebtoken";
import EmailVerification from "models/EmailVerification";
import createUserSchema from "schema/create-user";
import { sendEmailConfirmation } from "mail";
import User from "models/User";

export const Reigistration = async (req: Request, res: Response) => {
  const { body } = req;
  const validator = await createUserSchema(body);

  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { name, password, email,avatar, redirectLink } = value;

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  await User.create({
    name,
    password:hashedPassword,
    email,
    avatar,
    verify: false
  });

  const verificationHash = crypto.randomBytes(48).toString("hex");

  await EmailVerification.create({
    hash: verificationHash,
    email,
  });
  await sendEmailConfirmation(email, verificationHash, name, redirectLink);

  return res.status(201).json({ message: "new user create successfully" });
};


export const emailVerification = async (req: Request, res:Response) => {
  const { hash } = req.body

  const emailVerification = await EmailVerification.findOne({ hash })

  if(!emailVerification){
      return res.status(422).json({message: 'მონაცემები ვერ მოიძებნა'})
  }

  const email = await User.findOne({ email: emailVerification.email})

  if(!email){
      return res.status(422).json({message: 'მონაცემები ვერ მოიძებნა'})
  }
  await User.updateOne({ verify: true})

  await EmailVerification.deleteOne({ hash }); 

  return res.json({message: "email verified" })
}

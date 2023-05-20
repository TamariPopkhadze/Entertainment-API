import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import sendRecoverySchema from "schema/sendRecoverySchema";
import PasswordRecovery from "models/PasswordRecovery";
import { sendPasswordRecovery } from "mail";
import User from "models/User";
import passwordRecoverySchema from "schema/PasswordRecovery-Schema";

export const passwordRecoverySend = async (req: Request, res: Response) => {
  const { body } = req;
  const validator = await sendRecoverySchema(body);

  const { value: data, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { email, redirectLink } = data;

  const emailDocument = await User.findOne({ email: email });

  const hash = crypto.randomBytes(48).toString("hex");

  await PasswordRecovery.create({
    hash,
    email: emailDocument?.email,
  });

  const user = await User.findOne({ email: emailDocument?.email });

  await sendPasswordRecovery(email, hash, user?.name || "", redirectLink);

  return res.status(201).json({ message: "password recovery link send" });
};

export const passwordRecovery = async (req: Request, res: Response) => {
  const { body } = req;

  const validator = await passwordRecoverySchema(body);

  const { value: data, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { password, hash } = data;

  const passwordRecovery = await PasswordRecovery.findOne({ hash });

  if (!passwordRecovery) {
    return res.status(422).json({ message: "მონაცემები ვერ მოიძებნა" });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  await User.findOneAndUpdate(
    { id: passwordRecovery.email },
    { password: hashedPassword }
  );

  await passwordRecovery.deleteOne({ hash });

  return res.json({ message: "new password saved successfully" });
};

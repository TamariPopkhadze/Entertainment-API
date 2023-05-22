import { Request, Response } from "express";
import { User } from "models";
import { loginEmailSchema, loginNameSchema } from "schema/allSchema/login-schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



export const loginWithName = async (req: Request, res: Response) => {
  const { body } = req;

  const validator = await loginNameSchema(body);

  const { value: data, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { name, password } = data;

  const user = await User.findOne({ name }).select("+password");
  if (!user?.verify) {
    return res
      .status(401)
      .json({ message: "The user is not verified" });
  }

  const compare = await bcrypt.compare(password, user?.password || "");

  if (compare) {
    const signData: any = {
      name: user?.name || "",
      password: user?.password || "",
    };
    const token = jwt.sign(signData, process.env.JWT_SECRET || "");
    return res.json({ token });
  }

  return res.status(401).json({ message: "The data is incorrect" });
};


export const loginWithEmail = async (req: Request, res: Response) => {
  const { body } = req;

  const validator = await loginEmailSchema(body);

  const { value: data, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");
  console.log('error is not ')
  if (!user?.verify) {
    return res
      .status(401)
      .json({ message: "The user is not verified" });
  }

  const compare = await bcrypt.compare(password, user?.password || "");

  if (compare) {
    const signData: any = {
      email: user?.email || "",
      password: user?.password || "",
    };
    const token = jwt.sign(signData, process.env.JWT_SECRET || "");
    return res.json({ token });
  }

  return res.status(401).json({ message: "The data is incorrect" });
};

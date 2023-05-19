import Joi from "joi";
import User from "models/User";

const determineIfUserExists = (name: any) => (value: string, helpers: any) => {
  if (name) {
    return helpers.message("მომხმარებელი ამ სახელით უკვვე არსებობს");
  }
  return value;
};
const determineIfEmailExists =
  (email: any) => (value: string, helpers: any) => {
    if (email) {
      return helpers.message("ელ-ფოსტა უკვე გამოყენებულია");
    }
    return value;
  };
const createUserSchema = async (data: any) => {
  const name = await User.findOne({ name: data.name });
  const email = await User.findOne({ name: data.name });

  return Joi.object({
    name: Joi.string()
      .custom(determineIfUserExists(name))
      .min(3)
      .max(15)
      .pattern(/^[a-z0-9]*$/)
      .required()
      .messages({
        "string.base": "The name must be text",
        "string.min": "The name must consist of at least 3 characters",
        "string.max": "The name must contain a maximum of 15 characters",
        "string.pattern":
          "The name must contain only lowercase Latin letters and numbers",
        "any.required": "The name field must not be empty",
      }),
    password: Joi.string()
      .min(8)
      .max(15)
      .pattern(/^[a-z0-9]*$/)
      .required()
      .messages({
        "string.base": "The password must be text",
        "string.min": "The password must consist of at least 3 characters",
        "string.max": "The password must contain a maximum of 15 characters",
        "string.pattern":
          "The password must contain only lowercase Latin letters and numbers",
        "any.required": "The password field must not be empty",
      }),
    repeatPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "string.base": "The password must be text",
        "string.valid": "Must match the password",
        "any.required": "The password field must not be empty",
      }),
    email: Joi.string()
      .custom(determineIfEmailExists(email))
      .email()
      .required()
      .messages({
        "string.base": "Email must be text",
        "string.email": "Does not conform to email format",
        "any.required": "The email field must not be empty",
      }),
    avatar: Joi.string().required().messages({
      "string.base": "The link must be text",
      "any.required": "Link field should not be empty",
    }),
    redirectLink: Joi.string().required().messages({
      "string.base": "The link must be text",
      "any.required": "Link field should not be empty",
    }),
  });
};
export default createUserSchema;

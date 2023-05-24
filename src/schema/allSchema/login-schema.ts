import Joi from "joi";
import { User } from "models";

const determineIfUserExists = (user: any) => (value: string, helpers: any) => {
  if (!user) {
    return helpers.message("There is no user with this name");
  }

  return value;
};

const determineIfEmailExists =
  (email: any) => (value: string, helpers: any) => {
    if (!email) {
      return helpers.message("There is no user with this Email");
    }

    return value;
  };

export const loginNameSchema = async (data: any) => {
  const user = await User.findOne({ name: data.name });

  return Joi.object({
    name: Joi.string()
      .custom(determineIfUserExists(user))
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
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
      .required()
      .messages({
        "string.base": "The password must be text",
        "string.min": "The password must consist of at least 3 characters",
        "string.max": "The password must contain a maximum of 15 characters",
        "string.pattern":
          "The password must contain uppercase, lowercase Latin letters and numbers",
        "any.required": "The password field must not be empty",
      }),
  });
};

export const loginEmailSchema = async (data: any) => {
  const email = await User.findOne({ email: data.email });

  return Joi.object({
    email: Joi.string()
      .custom(determineIfEmailExists(email))
      .email()
      .required()
      .messages({
        "string.base": "Email must be text",
        "string.email": "Does not conform to email format",
        "any.required": "The email field must not be empty",
      }),
    password: Joi.string()
      .min(8)
      .max(15)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
      .required()
      .messages({
        "string.base": "The password must be text",
        "string.min": "The password must consist of at least 3 characters",
        "string.max": "The password must contain a maximum of 15 characters",
        "string.pattern":
          "The password must contain uppercase , lowercase Latin letters and numbers",
        "any.required": "The password field must not be empty",
      }),
  });
};

import Joi from "joi";
import PasswordRecovery from "models/PasswordRecovery";

const determineIfHashExists =
  (passwordRecovery: any) => (value: string, helpers: any) => {
    if (!passwordRecovery) {
      return helpers.message("The data is incorrect");
    }

    return value;
  };

const passwordRecoverySchema = async (data: any) => {
  const passwordRecovery = await PasswordRecovery.findOne({ hash: data.hash });

  return Joi.object({
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
    hash: Joi.string()
      .required()
      .custom(determineIfHashExists(passwordRecovery))
      .messages({
        "string.base": "Hash must be text",
        "any.required": "The hash field must not be empty",
      }),
  });
};

export default passwordRecoverySchema;

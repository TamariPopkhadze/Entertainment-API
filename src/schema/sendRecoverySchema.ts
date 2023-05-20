import Joi from "joi";
import User from "models/User";

const determineIfEmailExists =
  (email: any) => (value: string, helpers: any) => {
    if (!email) {
      return helpers.message("Email not found");
    }
    return value;
  };

const sendRecoverySchema = async (data: any) => {
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
    redirectLink: Joi.string().required().messages({
      "string.base": "The link must be text",
      "any.required": "Link field should not be empty",
    }),
  });
};

export default sendRecoverySchema;

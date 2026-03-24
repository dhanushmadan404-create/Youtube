import Joi from "joi";

export const UserSchemas = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(4)
    .max(20)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 4 characters",
      "string.max": "Name must be less than 20 characters"
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),

  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      "string.pattern.base": "Password must contain valid characters",
      "string.min": "Password must be at least 6 characters"
    }),

  profile_img: Joi.string()
    .uri()
    .required()
    .messages({
      "string.uri": "Profile image must be a valid URL"
    }),

  banner_img: Joi.string()
    .uri()
    .required()
    .messages({
      "string.uri": "Banner image must be a valid URL"
    }),

  description: Joi.string()
    .min(10)
    .max(200)
    .required(),

  age: Joi.number()
    .integer()
    .min(10)
    .max(100)
    .required()
})
.options({ abortEarly: false });
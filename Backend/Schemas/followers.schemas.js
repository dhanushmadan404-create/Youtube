import Joi from "joi";
export const followCheck = Joi.object({
  user_id: Joi.string().required(),
  fan_id: Joi.string().required(),
});

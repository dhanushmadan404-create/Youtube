import Joi from "joi";
export const ViewSchemas = Joi.object({
  user_id: Joi.string().required(),
  video_id: Joi.string().required(),
});

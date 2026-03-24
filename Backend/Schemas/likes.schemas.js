import Joi from "joi";
export const LikesSchemas = Joi.object({
  user_id: Joi.string().required(),
  video_id: Joi.string().required(),
});

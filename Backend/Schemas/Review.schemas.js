import Joi from "joi";
export const ReviewSchemas = Joi.object({
  user_id: Joi.string().required(),
  comment: Joi.string().min(10).max(100),
  rating: Joi.number().min(1).max(5).required(),
  video_id: Joi.string().required(),
});

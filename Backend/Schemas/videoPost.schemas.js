import Joi from "joi";
export const videoPost = Joi.object({
  user_id: Joi.string().required(),
  video_url:  Joi.string().uri().messages({
      "string.uri": "Profile image must be a valid URL",
    }),
  title: Joi.string().min(5).max(50).required(),
  thumbnail: Joi.string().uri().messages({
      "string.uri": "Profile image must be a valid URL",
    }),
  description: Joi.string().max(200).required(),
  category: Joi.string().required(),
  restriction: Joi.string().required(),
});

export const updateVideoSchemas = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  thumbnail:  Joi.string().uri().messages({
      "string.uri": "Profile image must be a valid URL",
    }),
  description: Joi.string().max(200).required(),
  category: Joi.string().required(),
  restriction: Joi.string().required(),
});

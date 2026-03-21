import Joi from 'joi'
export const videoPost=Joi.object({
    user_id:Joi.number().required(),
    video_url:Joi.string().required(),
    title:Joi.string().min(5).max(50).required(),
    thumbnail:Joi.string().required(),
    description:Joi.string().max(200).required(),
    category:Joi.string().required(),
    restriction:Joi.string().required(),
})
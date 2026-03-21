import { videoCreate } from '../controller/video.js'
import { Router } from 'express'
import { GetAll } from '../controller/video.js'
import { videoPost } from '../Schemas/videoPost.schemas.js'
import { videoPostValidation } from '../middleware/videoPost.js'
import { CategoryGet } from '../controller/video.js'
import { getByUser } from '../controller/video.js' 
const videoRouter=Router()

videoRouter.post("/",videoPostValidation(videoPost),videoCreate)

videoRouter.get("/",GetAll)
videoRouter.get("/:category",CategoryGet)
videoRouter.get("/user/:userid",getByUser)
export default videoRouter

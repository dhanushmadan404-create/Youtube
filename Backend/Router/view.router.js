import { Router } from "express";
import { ValidateView } from "../middleware/view.middleware.js";
import { ViewSchemas } from "../Schemas/view.schemas.js";
import { postView,getView,getByView,removeView } from "../controller/view.controller.js";
const likesRouter=Router()

likesRouter.post("/",ValidateView(ViewSchemas),postView)
likesRouter.get("/likes/:video_id",getView)
likesRouter.get("/user/like/:userid",getByView)
likesRouter.delete("/remove/:video_id/like/:userid",removeView)

export default likesRouter
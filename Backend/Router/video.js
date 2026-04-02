import { videoCreate } from "../controller/video.js";
import { Router } from "express";
import { GetAll } from "../controller/video.js";
import { videoPost,updateVideoSchemas } from "../Schemas/videoPost.schemas.js";
import { videoPostValidation,validateUpdateVideo } from "../middleware/videoPost.js";
import { CategoryGet } from "../controller/video.js";
import { getByUser } from "../controller/video.js";
import { removeVideo } from "../controller/video.js";
import { updateVideo } from "../controller/video.js";
const videoRouter = Router();

videoRouter.post("/", videoPostValidation(videoPost), videoCreate);

videoRouter.get("/", GetAll);
videoRouter.get("/:category", CategoryGet);
videoRouter.get("/user/:user_id", getByUser);
videoRouter.delete("/remove/:video_id", removeVideo);
videoRouter.put("/updateVideo/:video_id",validateUpdateVideo(updateVideoSchemas), updateVideo);
export default videoRouter;

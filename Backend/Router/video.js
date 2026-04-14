import { 
  videoCreate, 
  GetAll, 
  CategoryGet, 
  getByUser, 
  removeVideo, 
  updateVideo,
  Search,
  GetRecommendedVideos,
  IncrementViews,
  getTopFive,
  GetFollowingFeed
} from "../controller/video.js";
import { Router } from "express";
import { videoPost, updateVideoSchemas } from "../Schemas/videoPost.schemas.js";
import {
  videoPostValidation,
  validateUpdateVideo,
} from "../middleware/videoPost.js";

const videoRouter = Router();

videoRouter.post("/", videoPostValidation(videoPost), videoCreate);
videoRouter.get("/all", GetAll);
videoRouter.get("/search", Search); // Search endpoint
videoRouter.get("/five", getTopFive); // Following feed
videoRouter.get("/recommended/:video_id", GetRecommendedVideos); // Recommended videos
videoRouter.patch("/view/:video_id", IncrementViews); // Increment views
videoRouter.get("/following/:user_id", GetFollowingFeed); // Following feed videos

videoRouter.get("/user/:user_id", getByUser);
videoRouter.get("/cat/:category", CategoryGet); // Changed slightly to avoid conflict with /:video_id if needed, but let's keep it consistent
videoRouter.delete("/remove/:video_id", removeVideo);
videoRouter.put(
  "/updateVideo/:video_id",
  validateUpdateVideo(updateVideoSchemas),
  updateVideo,
);
export default videoRouter;

import { Router } from "express";
import { ValidateLikes } from "../middleware/likes.middleware.js";

import { LikesSchemas } from "../Schemas/likes.schemas.js";
import {
  postLikes,
  getLikes,
  getByLike,
  removeLike,
} from "../controller/likes.controller.js";
const likesRouter = Router();

likesRouter.post("/", ValidateLikes(LikesSchemas), postLikes);
likesRouter.get("/likes/:videoid", getLikes);
likesRouter.get("/user/like/:userid", getByLike);
likesRouter.delete("/remove/:videoid/like/:userid", removeLike);

export default likesRouter;

import { Router } from "express";
import { validateFollowers } from "../middleware/followers.middleware.js";
import { followCheck } from "../Schemas/followers.schemas.js";
import {
  followerPost,
  followersGet,
  followingGet,
  followingRemove,
  topChannelsGet,
  checkFollowers,
  checkController
} from "../controller/followers.js";

export const followRouter = Router();
followRouter.post("/", validateFollowers(followCheck), followerPost);

followRouter.get("/fans/:userid", followersGet);
followRouter.get("/check",checkController)
followRouter.get("/following/:userid", followingGet);
followRouter.delete("/removefollowing/:userid/:fanid", followingRemove);
followRouter.get("/top-channels", topChannelsGet);

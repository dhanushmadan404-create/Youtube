import { Router } from "express";
import { validateFollowers } from "../middleware/followers.middleware.js";
import {
  followerPost,
  followersGet,
  followingGet,
  followingRemove,
  topChannelsGet,
} from "../controller/followers.js";

export const followRouter = Router();
followRouter.post("/", validateFollowers, followerPost);
followRouter.get("/fans/:userid", followersGet);
followRouter.get("/following/:userid", followingGet);
followRouter.delete("/removefollowing/:userid/:fanid", followingRemove);
followRouter.get("/top-channels", topChannelsGet);

import { Router } from "express";
import { validateFollowers } from "../middleware/followers.middleware.js";
import {
  followerPost,
  followersGet,
  followingGet,
  followingRemove,
} from "../controller/followers.js";

const router = Router();
router.post("/", validateFollowers, followerPost);
router.get("/fans/:userid", followersGet);
router.get("/following/:userid", followingGet);
router.delete("/removeFollowing/:userid/:fanid", followingRemove);

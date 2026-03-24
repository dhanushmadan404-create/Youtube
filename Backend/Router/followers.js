import { Router } from "express";
import { validateFollowers } from "../middleware/followers.middleware.js";
import { followerPost,followersGet,followingGet,followingRemove } from "../controller/followers.js";

const router=router()
router.post("/",validateFollowers,followerPost)
router.get("/fans",followersGet)
router.get("/following",followingGet)
router.delete("/removeFollowing/:user_id/:fan_id",followingRemove)
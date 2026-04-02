import {
  likesPost,
  likesGet,
  videoByLike,
  likesRemove,
} from "../service/likes.service.js";
import { ObjectId } from "mongodb";
export const postLikes = async (req, res) => {
  const { user_id, video_id } = req.body;
  const body = {
    user_id:new ObjectId( user_id),
    video_id: new ObjectId(video_id),
  };
  const result = await likesPost(body);
  res.json(result);
};

export const getLikes = async (req, res) => {
  const  videoid  = req.params.video_id;
  const video_id=new ObjectId(videoid)
  const result = await likesGet(video_id);
  if (result.result.length === 0) {
  return res.status(404).json({ message: "No likes found" });
}
  res.json(result);
};

export const getByLike = async (req, res) => {
  const userid = req.params.userid;
  const user_id=new ObjectId(userid)
  const Result = await videoByLike(user_id);
  res.json(Result);
};
export const removeLike = async (req, res) => {
  const { userid, videoid } = req.params;
  const user_id=new ObjectId(userid)
  const video_id=new ObjectId(videoid)

  const result =await likesRemove(user_id, video_id);
  res.json(result);
};

import {
  likesPost,
  likesGet,
  videoByLike,
  likesRemove,
  likesCheck
} from "../service/likes.service.js";
import { ObjectId } from "mongodb";
export const postLikes = async (req, res) => {
  const { user_id, video_id } = req.body;

  const userObj = new ObjectId(user_id);
  const videoObj = new ObjectId(video_id);

  const check = await likesCheck(userObj, videoObj);

  // 👉 Already liked → remove (UNLIKE)
  if (check) {
    await likesRemove(userObj, videoObj);
    return res.json({
      status: "unliked",
      message: "Like removed"
    });
  }

  // 👉 Not liked → add (LIKE)
  await likesPost({
    user_id: userObj,
    video_id: videoObj,
  });

  return res.json({
    status: "liked",
    message: "Liked successfully"
  });
};

export const getLikes = async (req, res) => {
  const videoId = req.params.videoId;
  const video_id = new ObjectId(videoId);
  const result = await likesGet(video_id);
  res.json(result);
};

export const getByLike = async (req, res) => {
  const userid = req.params.userid;
  const user_id = new ObjectId(userid);
  const Result = await videoByLike(user_id);
  res.json(Result);
};
export const removeLike = async (req, res) => {
  const { userid, videoid } = req.params;
  const user_id = new ObjectId(userid);
  const video_id = new ObjectId(videoid);

  const result = await likesRemove(user_id, video_id);
  res.json(result);
};

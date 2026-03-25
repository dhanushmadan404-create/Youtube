import {
  viewPost,
  viewGet,
  videoByView,
  viewRemove,
} from "../service/view.service.js";
import { ObjectId } from "mongodb";
export const postView = async (req, res) => {
  const { userid, videoid } = req.body;
  const user_id=new ObjectId(userid)
  const video_id=new ObjectId(videoid)
  const body = {
    user_id,
    video_id,
  };
  const result = await viewPost(body);
  res.json(result);
};

export const getView = async (req, res) => {
  const { videoid } = req.params.video_id;
  const video_id=new ObjectId(videoid)
  const result = await viewGet(video_id);
  res.json(result);
};

export const getByView = async (req, res) => {
  const user_id = req.params.user_id;
  const userid=new ObjectId(user_id)
  const Result = await videoByView(userid);
  res.json(Result);
};
export const removeView = async (req, res) => {
  const { userid, videoid } = req.params;
  const user_id=new ObjectId(userid)
  const video_id=new ObjectId(videoid)
  
  const result = viewRemove(user_id, video_id);
};

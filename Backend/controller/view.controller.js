import {
  viewPost,
  viewGet,
  videoByView,
} from "../service/view.service.js";
import { ObjectId } from "mongodb";
export const postView = async (req, res) => {
  const { userid, videoid } = req.body;
  const user_id=new ObjectId(userid)
  const video_id=new ObjectId(videoid)
  const body = {
    user_id:user_id,
    video_id:video_id,
  };
  const result = await viewPost(body);
  res.json(result);
};

export const getView = async (req, res) => {
  const videoid  = req.params.videoid;
  const video_id=new ObjectId(videoid)
  res.json(video_id)
  const result = await viewGet(video_id);
  if(result.result.length>0){

    res.json(result);
  }else{
    res.status(404).json({
      Message:"no views"
    })
  }
};

export const getByView = async (req, res) => {
  const user_id = req.params.user_id;
  const userid=new ObjectId(user_id)
  const Result = await videoByView(userid);
  res.json(Result);
};

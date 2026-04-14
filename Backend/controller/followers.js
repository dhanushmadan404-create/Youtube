import {
  removeFollowing,
  postFollowers,
  getFollowers,
  getFollowing,
  getTopChannels,
  check
} from "../service/followers.js";
import { ObjectId } from "mongodb";
export const followerPost = async (req, res) => {
  const { user_id, fan_id } = req.body;

  const result = await postFollowers(
    new ObjectId(user_id),
    new ObjectId(fan_id),
  );
  res.json(result);
};
export const followersGet = async (req, res) => {
  const { userid } = req.params;
  const user_id = new ObjectId(userid);

  const result = await getFollowers(user_id);
  res.json(result);
};

export const checkFollowers = async (req, res) => {
  const { user_id,fan_id } = req.body;
  const userid = new ObjectId(user_id);
  const fanId=new ObjectId(fan_id)

  const result = await getFollowers(user_id,fan_id);
  res.json(result);
};

export const followingGet = async (req, res) => {
  const { userid } = req.params;
  const user_id = new ObjectId(userid);
  const result = await getFollowing(user_id);
  res.json(result);
};

export const followingRemove = async (req, res) => {
  const { userid, fanid } = req.params;
  const user_id = new ObjectId(userid);
  const fan_id = new ObjectId(fanid);

  const result = await removeFollowing(user_id, fan_id);
  res.json(result);
};

export const topChannelsGet = async (req, res) => {
  const result = await getTopChannels();
  res.json(result);
};

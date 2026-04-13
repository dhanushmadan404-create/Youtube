import { getDb } from "../config/db_connect.js";
import { ObjectId } from "mongodb";

export const PostReview = async (body) => {
  const Db = await getDb();
  const result = await Db.collection("comments").insertOne(body);
  return result;
};

export const GetReviewVid = async (Video_id) => {
  const Db = await getDb();
  // We should aggregate to get user info for each comment
  const result = await Db.collection("comments")
    .aggregate([
      { $match: { video_id: Video_id } },
      {
        $lookup: {
          from: "User",
          localField: "user_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
    ])
    .toArray();
  return result;
};

export const RemoveReview = async (commentId) => {
  const Db = await getDb();
  const result = await Db.collection("comments").deleteOne({
    _id: new ObjectId(commentId),
  });
  return result;
};

export const GetReviewUser = async (User_id) => {
  const Db = await getDb();
  const result = await Db.collection("comments")
    .find({ user_id: User_id })
    .toArray();
  return result;
};
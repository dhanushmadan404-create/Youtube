import { getDb } from "../config/db_connect.js";
import { ObjectId } from "mongodb";
export const GetUserAll = async () => {
  const DB_name = await getDb();
  const result = await DB_name.collection("User").find().toArray();
  return result;
};

export const UserPost = async (Body) => {
  const DB_name = await getDb();

  const result = await DB_name.collection("User").insertOne(Body);
  return result;
};
export const GetByEmail = async (email) => {
  const DB_name = await getDb();

  const result = await DB_name.collection("User").findOne({ email: email });
  return result;
};
export const GetByUserId = async (user_id) => {
  const DB_name = await getDb();

  const result = await DB_name.collection("User")
    .aggregate([
      {
        $match: {
          _id: user_id,
        },
      },
      {
        $lookup: {
          from: "Video",
          localField: "_id",
          foreignField: "user_id",
          as: "videos",
        },
      },
    ])
    .toArray();

  return result[0];
};
export const UpdateUser = async (Userid, updateData) => {
  const DB_name = await getDb();

  const result = await DB_name.collection("User").updateOne(
    { _id: Userid },
    { $set: updateData },
  );
  return result;
};

export const GetTopChannels = async () => {
  const DB = await getDb();
  const result = await DB.collection("followers")
    .aggregate([
      {
        $group: {
          _id: "$user_id",
          followerCount: { $sum: 1 },
        },
      },
      { $sort: { followerCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "User",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 1,
          followerCount: 1,
          name: "$userInfo.name",
          profileImage: "$userInfo.profileImage",
          description: "$userInfo.description",
        },
      },
    ])
    .toArray();
  return result;
};

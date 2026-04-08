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

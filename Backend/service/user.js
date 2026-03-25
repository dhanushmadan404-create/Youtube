import { getDb } from "../config/db_connect.js";
import { ObjectId } from "mongodb";
const DB_name = await getDb();
export const GetUserAll = async () => {
  const result = await DB_name.collection("User").find().toArray();
  return result;
};

export const UserPost = async (Body) => {
  const result = await DB_name.collection("User").insertOne(Body);
  return result;
};
export const GetByEmail = async (email) => {
  const result = await DB_name.collection("User").findOne({ email: email });
  return result;
};
export const UpdateUser = async (Userid, updateData) => {
  const result = await DB_name.collection("User").updateOne(
    { _id: new ObjectId(Userid) },
    {},
  );
};

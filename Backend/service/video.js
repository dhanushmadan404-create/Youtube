import { getDb } from "../config/db_connect.js";
import { ObjectId } from "mongodb";

// ? Post video
export const CreateVideo = async (Body) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video").insertOne(Body);
    if (Result) {
      return {
        Message: "video Created",
        result: Result,
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
// ? get all video
export const GetAllVideo = async () => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video").find().toArray();
    if (Result) {
      return Result;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

// ? get all video by category
export const Category = async (category) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video")
      .find({ Category: category })
      .toArray();
    if (Result) {
      return Result;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const videoByUser = async (userid) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video")
      .find({ user_id: userid })
      .toArray();
    if (Result) {
      return Result;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const videoRemove = async (Video_id) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video").deleteOne({
      _id:Video_id,
    });
    if (Result.deletedCount >= 1) {
      return { message: "Video deleted successfully" };
    } else {
      return { message: "Video not found" };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const videoUpdate = async (videoId, Body) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video").updateOne(
      { _id: new ObjectId(videoId) },
      { $set: Body },
    );
    if (Result.modifiedCount === 0) {
      return { message: "No update done" };
    } else {
      return { message: "SuccessFully Updated" };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

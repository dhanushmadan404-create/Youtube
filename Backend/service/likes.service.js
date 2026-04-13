import { getDb } from "../config/db_connect.js";

export const likesPost = async (body) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Likes").insertOne(body);
    if (Result) {
      return {
        Message: "likes Created",
        result: Result,
      };
    }
  } catch (err) {
    if (err.code === 11000) {
      return "Already liked this video";
    }
    console.log(err);
    return err;
  }
};

export const likesGet = async (video_id) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Likes").countDocuments({
      video_id: video_id,
    });
    return Result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const videoByLike = async (userid) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Likes")
      .aggregate([
        {
          $match: { user_id: userid },
        },
        {
          $lookUp: {
            from: "Video",
            localField: "video_id",
            foreignField: "_id",
            as: "video",
          },
        },
      ])
      .toArray();
    return Result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const likesCheck = async (userId, videoId) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Likes").findOne({
      video_id: videoId,
      user_id: userId,
    });
    return Result
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const likesRemove = async (userId, videoId) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Likes").deleteOne({
      video_id: videoId,
      user_id: userId,
    });
    if (Result.deletedCount >= 1) {
      return {
        Message: "successFully like roved",
        result: Result,
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

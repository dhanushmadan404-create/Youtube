import { getDb } from "../config/db_connect.js";
export const viewPost = async (body) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Views").insertOne(body);
    if (Result) {
      return {
        Message: "likes Created",
        result: Result,
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const viewGet = async (video_id) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Views")
      .find({ video_id: video_id })
      .toArray();
    if (Result) {
      return {
        Message: "successFully get total view",
        result: Result,
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const videoByView = async (userid) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Views")
      .aggregate([
        {
          $match: { user_id: userid },
        },
        {
          $lookup: {
            from: "Video",
            localField: "video_id",
            foreignField: "_id",
            as: "video",
          },
        },
      ])
      .toArray();
      return Result
  } catch (err) {
    console.log(err);
    return err;
  }
};

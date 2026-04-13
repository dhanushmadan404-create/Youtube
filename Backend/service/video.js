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
// ? get all video (with pagination and age restriction)
export const GetAllVideo = async (skip = 0, limit = 10, userAge = null) => {
  try {
    const DB = await getDb();
    
    // Base match for age restriction: if restriction is "18+" and userAge < 18, filter out.
    // Assuming restriction field contains values like "All", "18+", etc.
    let matchStage = {};
    if (userAge !== null && userAge < 18) {
      matchStage = { restriction: { $ne: "18+" } };
    }

    const Result = await DB.collection("Video").aggregate([
      { $match: matchStage },
      {
        $lookup:{
          from:"User",
          localField:"user_id",
          foreignField:"_id",
          as:"userInfo"
        }
      },
      { $unwind:"$userInfo" },
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) }
    ]).toArray();
    
    return Result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// ? get videos only from users that current user follows
export const GetFollowingVideos = async (followerId) => {
  try {
    const DB = await getDb();
    // 1. Get list of user_ids that this follower follows
    const following = await DB.collection("followers")
      .find({ fan_id: followerId })
      .toArray();
    
    const followedUserIds = following.map(f => new ObjectId(f.user_id));

    // 2. Get videos from those users
    const Result = await DB.collection("Video").aggregate([
      { $match: { user_id: { $in: followedUserIds } } },
      {
        $lookup:{
          from:"User",
          localField:"user_id",
          foreignField:"_id",
          as:"userInfo"
        }
      },
      { $unwind:"$userInfo" }
    ]).toArray();

    return Result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// ? increment view count
export const IncrementView = async (videoId) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video").updateOne(
      { _id: new ObjectId(videoId) },
      { $inc: { views: 1 } }
    );
    return Result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// ? search videos
export const SearchVideos = async (query) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video").aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
          ]
        }
      },
      {
        $lookup:{
          from:"User",
          localField:"user_id",
          foreignField:"_id",
          as:"userInfo"
        }
      },
      { $unwind:"$userInfo" }
    ]).toArray();
    return Result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// ? get recommended videos (same category or similar title)
export const GetRecommended = async (videoId, category, title) => {
  try {
    const DB = await getDb();
    const keywords = title.split(" ").filter(w => w.length > 3);
    const Result = await DB.collection("Video").aggregate([
      {
        $match: {
          _id: { $ne: new ObjectId(videoId) },
          $or: [
            { category: category },
            { title: { $regex: keywords.join("|"), $options: "i" } }
          ]
        }
      },
      { $limit: 10 },
      {
        $lookup:{
          from:"User",
          localField:"user_id",
          foreignField:"_id",
          as:"userInfo"
        }
      },
      { $unwind:"$userInfo" }
    ]).toArray();
    return Result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// ? get all video by category
export const Category = async (category) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video").aggregate([
      { $match: { category: category } },
      {
        $lookup:{
          from:"User",
          localField:"user_id",
          foreignField:"_id",
          as:"userInfo"
        }
      },
      { $unwind:"$userInfo" }
    ]).toArray();
    return Result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const videoByUser = async (userid) => {
  try {
    const DB = await getDb();
    const Result = await DB.collection("Video").aggregate([
      { $match: { user_id: userid } },
      {
        $lookup:{
          from:"User",
          localField:"user_id",
          foreignField:"_id",
          as:"userInfo"
        }
      },
      { $unwind:"$userInfo" }
    ]).toArray();
    return Result;
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

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
export const GetAllVideo = async () => {
  try {
    const DB = await getDb();

    const result = await DB.collection("Video").aggregate([
      {
        $lookup: {
          from: "User",
          localField: "user_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: {
          path: "$userInfo",
          preserveNullAndEmptyArrays: true,
        },
      },

      // 🔥 CLEAN RESPONSE
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          video_url: 1,
          thumbnail: 1,
          category: 1,
          restriction: 1,
          createdAt: 1,

          // user fields (flatten)
          user: {
            _id: "$userInfo._id",
            name: "$userInfo.name",
            email: "$userInfo.email",
            profileImage: "$userInfo.profileImage",
          },
        },
      },

   
    ]).toArray();

    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
// ? get top 5 videos based on views (reads views field from Video collection)
export const getFive = async () => {
  try {
    const DB = await getDb();
    const result = await DB.collection("Video").aggregate([
      // Add a computed field so videos without a 'views' field are treated as 0
      {
        $addFields: {
          views: { $ifNull: ["$views", 0] }
        }
      },
      // Only include videos that have at least 1 view
      { $match: { views: { $gt: 0 } } },
      // Sort by most views first
      { $sort: { views: -1 } },
      // Take top 5
      { $limit: 5 },
      // Join with User collection to get channel info
      {
        $lookup: {
          from: "User",
          localField: "user_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" }
    ]).toArray();

    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getFollowingFeed = async (userId) => {
  try {
    const DB = await getDb();
    const followRecords = await DB.collection("Followers")
      .find({ user_id: userId })
      .toArray();

    if (followRecords.length === 0) return [];

    const followedUserIds = followRecords.map((r) => r.fan_id);

    const result = await DB.collection("Video").aggregate([
      { $match: { user_id: { $in: followedUserIds } } },
      { $sort: { _id: -1 } }, 
      {
        $lookup: {
          from: "User",
          localField: "user_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" }
    ]).toArray();

    return result;
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

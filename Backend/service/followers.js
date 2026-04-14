import { getDb } from "../config/db_connect.js";

export const postFollowers = async (user_id, fan_id) => {
  const Db = await getDb();

  const check = await Db.collection("Followers").findOne({
    user_id: user_id,
    fan_id: fan_id,
  });

  if (check) {
    await Db.collection("Followers").deleteOne({
      user_id: user_id,
      fan_id: fan_id,
    });

    return { status: "unfollowed" };
  }

  await Db.collection("Followers").insertOne({
    user_id: user_id,
    fan_id: fan_id,
  });

  return { status: "followed" };
};
export const check = async (user_id,fan_id) => {
  const Db = await getDb();
  const check = await Db.collection("Followers").findOne({
    user_id: user_id,
    fan_id: fan_id,
  });
  if (check) {
  

    return { status: "followed" };
  }
  
};
export const getFollowers = async (user_id) => {
  const Db = await getDb();
  const result = await Db.collection("Followers")
    .find(
      {
        user_id: user_id,
      },
      {
        projection: {
          fan_id: 1,
        },
      },
    )
    .toArray();

  return result;
};

export const getFollowing = async (user_id) => {
  const Db = await getDb();
  
  const result = await Db.collection("Followers")
    .aggregate([
      { $match: { user_id: user_id } },
      {
        $lookup: {
          from: "User",
          localField: "fan_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          user_id: "$userInfo._id",
          name: "$userInfo.name",
          profileImage: "$userInfo.profileImage",
          profile_img: "$userInfo.profile_img",
        }
      }
    ])
    .toArray();

  return result;
};



export const removeFollowing = async (user_id, fan_id) => {
  const Db = await getDb();

  const deleteResult = await Db.collection("Followers").deleteOne({
    user_id: user_id,
    fan_id: fan_id,
  });

  if (deleteResult.deletedCount === 0) {
    return { status: "not_found" };
  }

  return { status: "unfollowed" };
};

export const getTopChannels = async () => {
  try {
    const Db = await getDb();
    const result = await Db.collection("Followers")
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
            "userInfo.name": 1,
            "userInfo.profileImage": 1,
            "userInfo._id": 1,
          },
        },
      ])
      .toArray();
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

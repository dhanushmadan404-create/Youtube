export const likesPost=async(body)=>{
     try {
    const DB = await getDb();
    const Result = await DB.collection("Likes").insertOne(body)
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
}

export const likesGet=async(videoId)=>{
     try {
    const DB = await getDb();
    const Result = await DB.collection("Likes").find({video_id:videoId}).toArray()
   if (Result) {
      return {
        Message: "successFully get total like",
        result: Result,
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}


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
  } catch (err) {
    console.log(err);
    return err;
  }
};


export const likesRemove=async(userId,videoId)=>{
     try {
    const DB = await getDb();
    const Result = await DB.collection("Likes").deleteOne({video_id:videoId,user_id:userId})
   if (Result.deletedCount>=1) {
      return {
        Message: "successFully like roved",
        result: Result,
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

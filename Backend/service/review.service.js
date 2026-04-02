import { getDb } from "../config/db_connect.js"
export const PostReview=async (body)=>{
    const Db=await getDb()
    const result=await Db.collection("comments").insertOne(body)
    return result
}

export const GetReviewVid=async (Video_id)=>{
    const Db=await getDb()    
    const result=await Db.collection("comments").find({video_id:Video_id }).toArray()
    return result
}

export const GetReviewUser=async (User_id)=>{
        const Db=await getDb()
    const result=await Db.collection("comments").find({user_id:User_id }).toArray()
    return result
}

export const GetReviewRating=async (Rating_num)=>{
        const Db=await getDb()
    const result=await Db.collection("comments").find({rating:Rating_num }).toArray()
    return result
}
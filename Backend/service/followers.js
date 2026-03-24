import { getDb } from "../config/db_connect";
export const postFollowers= async (body)=>{
    const Db=await getDb()
    const result=await Db.collection("Followers").insertOne(body)
    return result
}

export  const getFollowers=async(user_id)=>{
     const Db=await getDb()
    const result=await Db.collection("Followers").aggregate([{
        $match:{fan_id:user_id}
    },{
       $group:{
        _id:"$user_id",
        total_count:{$sum:1}
       } 
    }]).toArray()

    return result
}

export  const getFollowing=async(user_id)=>{
     const Db=await getDb()
    const result=await Db.collection("Followers").find({
        user_id:user_id
    },{
        $project:{
            fan_id:1
        }
    }).toArray()
    return result
}

export  const removeFollowing=async(user_id,fan_id)=>{
     const Db=await getDb()
    const result=await Db.collection("Followers").deleteOne({$and:[{user_id:user_id},{fan_id:fan_id}]})
    return result
}

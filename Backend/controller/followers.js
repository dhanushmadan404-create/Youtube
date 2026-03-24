import { removeFollowing,postFollowers,getFollowers,getFollowing } from "../service/followers.js"
export const followerPost=async(req,res)=>{
    const {user_id,fan_id}=await req.body
    const body={
        user_id:user_id,
        fan_id:fan_id
    }
    const result= await postFollowers(body)
    res.json(result)

}
export const followersGet=async(req,res)=>{
    const {user_id}=req.body
    const result=await getFollowers(user_id)
    res.json(result)
}
export const followingGet=async(req,res)=>{
    const {user_id}=req.body
    const result=await getFollowing(user_id)
    res.json(result)
}

export const followingRemove=async(req,res)=>{
    const {user_id,fan_id}=req.params
    const result=await removeFollowing(user_id,fan_id)
    res.json(result)
}

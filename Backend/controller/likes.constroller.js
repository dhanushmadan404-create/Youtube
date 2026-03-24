import { likesPost,likesGet,videoByLike,likesRemove } from "../service/likes.service.js"
export const postLikes=async(req,res)=>{
    const {user_id,video_id}=req.body
    const body={
        user_id,
        video_id
    }
    const result=await likesPost(body)
    res.json(result)
}

export const getLikes=async(req,res)=>{
    const {video_id}=req.params.video_id
    const result=await likesGet(video_id)
    res.json(result)
}

export const getByLike=async (req,res)=>{
     const userid=req.params.userid
    const Result=await videoByLike(userid)
    res.json(Result)
}
export const removeLike=async(req,res)=>{
    const {user_id,video_id}=req.params
    const result=likesRemove(user_id,video_id)
}


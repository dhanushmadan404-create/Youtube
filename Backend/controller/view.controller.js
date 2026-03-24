import { viewPost,viewGet,videoByView,viewRemove } from "../service/view.service.js"

export const postView=async(req,res)=>{
    const {user_id,video_id}=req.body
    const body={
        user_id,
        video_id
    }
    const result=await viewPost(body)
    res.json(result)
}

export const getView=async(req,res)=>{
    const {video_id}=req.params.video_id
    const result=await viewGet(video_id)
    res.json(result)
}

export const getByView=async (req,res)=>{
     const userid=req.params.userid
    const Result=await videoByView(userid)
    res.json(Result)
}
export const removeView=async(req,res)=>{
    const {user_id,video_id}=req.params
    const result=viewRemove(user_id,video_id)
}


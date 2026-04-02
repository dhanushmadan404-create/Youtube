import {PostReview,GetReviewVid,GetReviewRating,GetReviewUser }from "../service/review.service.js"
import { ObjectId } from "mongodb"
export const ReviewPost=async(req,res)=>{
    const{user_id,comment,rating,video_id}=req.body
    const body={
        user_id:new ObjectId(user_id),
        comment:comment,
        rating:rating,
        video_id:new ObjectId(video_id)
    }
    const result=await PostReview(body)
    res.json(result)
}

export const ReviewGetVid=async(req,res)=>{
   const {id}=req.params
   const Video_id=new ObjectId(id)
    const result=await GetReviewVid(Video_id)
    res.json(result)
}


export const ReviewGetUser=async(req,res)=>{
   const {id}=req.params
   const User_id=new ObjectId(id)
    const result=await GetReviewUser(User_id)
    res.json(result)
}

export const ReviewGetRating=async(req,res)=>{
   const {num}=req.params
   const Rating_num=Number(num)
    const result=await GetReviewRating(Rating_num)
    res.json(result)
}

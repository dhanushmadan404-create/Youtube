
import { CreateVideo } from "../service/video.js";
import { GetAllVideo } from "../service/video.js";
import { Category } from "../service/video.js";
import { videoByUser } from "../service/video.js";
import { videoRemove } from "../service/video.js";
import { videoUpdate } from "../service/video.js";
export const videoCreate= async (req,res)=>{
    const {user_id,video_url,title,thumbnail,description,category,restriction}=req.body
    const Body={
        user_id:user_id,
        video_url:video_url,
        title:title,
        thumbnail:thumbnail,
        description:description,
        category:category,
        restriction:restriction
    }
    const Result=await CreateVideo(Body)
    await res.json(Result)

}

export const GetAll= async (req,res)=>{
    const Result=await GetAllVideo()
    res.json(Result)
}


    export const CategoryGet= async (req,res)=>{
        const category=req.params.category
        const Result=await Category(category)
        res.json(Result)
}

export const getByUser= async (req,res)=>{
    const userid=req.params.userid
    const Result=await videoByUser(userid)
    res.json(Result)
}



export const removeVideo=async (req,res)=>{
     const userid=req.params.video_id
    const Result=await videoRemove(userid)
    res.json(Result)
}

export const updateVideo=async (req,res)=>{
    const videoId=req.params.video_id
    const {user_id,video_url,title,thumbnail,description,category,restriction}=req.body
    const Body={
        video_url:video_url,
        title:title,
        thumbnail:thumbnail,
        description:description,
        category:category,
        restriction:restriction
    }
    const result =await videoUpdate(videoId,Body)
    res.json(result)
}
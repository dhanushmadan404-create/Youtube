import { GetUserAll,UserPost } from "../service/user.js"
import { Hashing } from "../helper/auth.helper.js"

export const UserAll=async(req,res)=>{
    const result=await GetUserAll()
    res.json(result)
}
export const PostUser=async(req,res)=>{
    const {name,email,password,profile_img,banner_img,description,age}=req.body
    const HashedPassword=await Hashing(password)

    const Body={
        name:name,
        email:email,
        password:HashedPassword,
        profileImage:profile_img,
        BannerImage:banner_img,
        Description:description,
        Age:age
    }
    const result=await UserPost(Body)
    res.json(result) 
}
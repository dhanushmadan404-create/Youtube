import { getDb } from "../config/db_connect.js";

// ? Post video
export const CreateVideo=async (Body)=>{
    try{

        const DB=await getDb()
        const Result=await DB.collection('Video').insertOne(Body)
        if(Result){
            return({
                Message:"video Created",
                result:Result
            })
            
        }
    }catch(err){
        console.log(err)
    }
}
// ? get all video
export const GetAllVideo=async ()=>{
    try{

        const DB=await getDb()
        const Result=await DB.collection('Video').find().toArray()
        if(Result){
            return(Result)
            
        }
    }catch(err){
        console.log(err)
    }
}

// ? get all video by category
export const Category=async (category)=>{
    try{

        const DB=await getDb()
        const Result=await DB.collection('Video').find({Category:category}).toArray()
        if(Result){
            return(Result)
            
        }
    }catch(err){
        console.log(err)
    }
}


export const videoByUser=async (userid)=>{
    try{

        const DB=await getDb()
        const Result=await DB.collection('Video').find({user_id:userid}).toArray()
        if(Result){
            return(Result)
            
        }
    }catch(err){
        console.log(err)
    }
}
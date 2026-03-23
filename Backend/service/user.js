import { getDb } from "../config/db_connect.js"
export const GetUserAll=async()=>{
    const DB= await getDb()
    const result=await DB.collection('User').find().toArray()
    return result

}

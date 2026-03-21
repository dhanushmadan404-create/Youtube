import { GetUserAll } from "../service/user.js"
export const UserAll=async(req,res)=>{
    const result=await GetUserAll()
    res.json(result)
}
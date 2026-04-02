import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv()
export async function Generate(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: 60 * 60,
  });
}

export async function VerifyJwt(token){
  try{

    const result=jwt.verify(token,process.env.SECRET_KEY,(error,data)=>{
      return {error:null,data}
    })
  } catch(error){
    return {error}
  }
}

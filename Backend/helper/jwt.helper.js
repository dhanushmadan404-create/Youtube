import jwt from "jsonwebtoken"
export async function Generate(payload){
    return jwt.sign(payload,process.env.SECRETE_KEY,{
        algorithm:"HS256",
        expiresIn:60*60
    })
}


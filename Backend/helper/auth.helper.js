import  argon2  from "argon2"

 async function Hashing(pass){
    try{

        return await argon2.hash(pass)
    }catch(error){
        return  error
    }
}

async function Verify(pass,dbPassword){
    try{
        return await argon2.verify(dbPassword,pass)

    }catch(error){
        return error

    }
}

export {Hashing,Verify}
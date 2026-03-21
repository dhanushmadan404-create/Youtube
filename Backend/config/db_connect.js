import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
configDotenv()
let start;
let DB_name
async function connect(){
    try{

        start= new MongoClient(process.env.MONGODB_URL)
        await start.connect()
        DB_name=start.db(process.env.DB_name)
        console.log("Storage is connected")
    }catch(err){
        console.log(err)
    }
}

 async function getDb() {
    return DB_name
}

export {connect,getDb}
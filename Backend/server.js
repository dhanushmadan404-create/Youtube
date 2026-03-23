import express from "express"
import {connect} from "./config/db_connect.js"
import  router  from "./Router/user.js"
import videoRouter from "./Router/video.js" 
import cors from "cors"

// Store the express power
const app=express()

app.use(express.json())
app.use(cors())
connect()
app.listen(process.env.PORT,()=>{
    app.use("/user",router)
    app.use('/video',videoRouter)
    console.log("Node Express start his game")
})

app.get("/demo",(req,res)=>{
    res.json({
        Message:"Methods Working"
    })
})
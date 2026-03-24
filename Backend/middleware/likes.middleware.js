export const ValidateLikes=async (schemas)=>{
    return (req,res,next)=>{
        const{value,error}=schemas.validate(req.body)
        if(error){
            res.json("Invalid ID")
        }else{
            next()
        }
    }
}
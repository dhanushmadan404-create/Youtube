export const ValidateUser=(schemas)=>{
    return(req,res,next)=>{
        const{value,error}=schemas.validate(req.body)
        if(error){
            res.json({
                Message:"Invalid Input"
            })
        }else{
            next()
        }
    }
}
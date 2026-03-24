
export const videoPostValidation=(schemas)=>{
    return (req,res,next)=>{
        const{value,error}=schemas.validate(req.body)//return value and error if error have value response is error msg
        if(error){
            res.json(`Invalid Input:${error}`)
        }
        else{
            next()
        }
    }
}
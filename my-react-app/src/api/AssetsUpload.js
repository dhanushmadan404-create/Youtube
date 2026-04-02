import axios from "axios"
async function Cloud(file){
    try{

        const newObject=new FormData()
        newObject.append("file",file)
        newObject.append("upload_preset","media_upload")
        const response= await axios.post("https://api.cloudinary.com/v1_1/dpaqr0ffc/auto/upload",newObject)
        const data=await response.data.secure_url
        return data
        }catch(err){
        
        console.log(err)
        return null
    }


}

export default Cloud
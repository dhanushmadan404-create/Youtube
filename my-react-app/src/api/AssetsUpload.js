import axios from "axios"
// import { v2 as cloudinary } from 'cloudinary';
export async function Cloud(file){
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



// cloudinary.config({
//   cloud_name: "dpaqr0ffc",
//   api_key: "289763629267261",
//   api_secret: "your_api_secret",
// });

// export const deleteImage = async (req, res) => {
//   try {
//     const { public_id } = req.body;

//     const result = await cloudinary.uploader.destroy(public_id);

//     res.json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
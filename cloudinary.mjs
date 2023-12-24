import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()



cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

// const uploadOnCloudinary = async (localPath) => {
//     try {
//         const cloudinaryResponse = await cloudinary.uploader.upload(localPath);
//         console.log("Cloudinary upload success:", cloudinaryResponse);
//         return cloudinaryResponse;
//     } catch (error) {
//         console.error("Cloudinary upload error:", error);
//         return null;
//     }
// };





export {uploadOnCloudinary}







// export default { uploadOnCloudinary };





// cloud_name: 'dtqpcferx', 
//         api_key: '931585451362816', 
//         api_secret: 'OhWXIpjAK6zLcJbxuV1f-TA8s-Y' 
     
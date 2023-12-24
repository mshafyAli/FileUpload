import User from "../Models/uer.model.js"
import { uploadOnCloudinary } from "../../cloudinary.mjs";

import upload  from '../../multer.mjs';

// export const createStudents = async (req, res) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;

//         if (!firstName || !lastName || !email || !password || !req.file) {
//             return res.status(400).send({
//                 message: `Required parameters are missing. Example request body: 
//                     {
//                         "firstName": "firstName",
//                         "lastName": "lastName",
//                         "email": "email",
//                         "password": "password",
//                         "image": "image"
//                     }`,
//             });
//         }
//         const cloudinaryResponse = await new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream({
//                 folder: 'profile-pictures',
//                 resource_type: 'image',
//                 overwrite: true,
//             }, (error, result) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(result);
//                 }
//             });

//             if (req.file.stream) {
//                 console.log(req.file)
//                 req.file.stream.pipe(stream);
//             } else {
//                 reject(new Error("File stream is undefined"));
//             }
//         });

//         const newUser = new User({
//             firstName,
//             lastName,
//             email: email.toLowerCase(),
//             password,
//             profilePicture: cloudinaryResponse.url,
//         });


//                 await newUser.save();

//         res.send({
//             message: "User added successfully",
//             user: newUser,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             message: "Server error",
//         });
//     }
// }


export const registerUser = async (req, res) => {
    try{


        // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullName, email, username, password } = req.body
    console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).send({
            message: "All fields are required",
        }) 

    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        return res.status(400).send({
            message: "User with email or username already exists",
        }) 
    }
    console.log(req.files);

    const avatarLocalPath = req.files && req.files.avatar && req.files.avatar[0] && req.files.avatar[0].path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log("Avatar upload",avatarLocalPath);
    // console.log("Cover image upload",coverImageLocalPath);

    if (!avatarLocalPath) {
        return res.status(400).send({
            message: "Avatar  file is required",
        }) 
    }

   
    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar || !avatar.url) {
        console.log("Avatar upload",avatar);
        return res.status(400).send({
            message: "Avatar file is required",
        }) 
       
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        // coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
        
    })

    const createdUser = await User.findById(user._id)

    if (!createdUser) {
        return res.status(400).send({
            message: "something went wrong",
        }) 
       
    }
    if(createdUser){

        return res.status(201).send({
            message: "User created successfully",
        })
    }


    }catch(err){
        console.log(err);
        return res.status(500).send({
            message: "something went wrong",
        }) 

    }

   
}


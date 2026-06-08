import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import {v2 as cloudinary} from 'cloudinary'

// For becoming educator function
export const updateRoleEducator = async (req, res) => {
  try {
    const { userId } = await req.auth();

   
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({
      success: true,
      message: "You can publish a course now",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


//Course uploading function



export const addCourse = async(req,res)=>{
   
  try{

      const { userId: educatorId } = await req.auth();


      const imageFile = req.file;

      if(!imageFile){
        return res.status(400).json({
          message:"Plz attach the course thumbnail"
        })
      }

      const parsedCourseData = JSON.parse(req.body.courseData);

      parsedCourseData.educator = educatorId;

      const newCourse = await Course.create(parsedCourseData);

      const imageUpload = await cloudinary.uploader.upload(imageFile.path);

      newCourse.courseThumbnail = imageUpload.secure_url;

      await newCourse.save();

      return res.status(200).json({
        success:true,
        message:"Course Added"
      });

  } catch(err){
      console.log("ERROR:", err);

      return res.status(500).json({
        message: err.message
      });
  }
}

//get Educator Courses

export const getEducatorCourses = async(req,res)=>{
  try{
  const { userId: educator } = await req.auth();
  
  const courses = await Course.find({educator})

  res.status(200).json({
    courses
  })

  }
  catch(error){
     return res.json(error.message)
  }
}
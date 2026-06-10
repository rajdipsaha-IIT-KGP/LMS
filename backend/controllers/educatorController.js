import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import {v2 as cloudinary} from 'cloudinary'
import { Purchase } from "../models/purchase.js";
import User from "../models/User.js";

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
          success:false,
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
        success:false,
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
    success:true,
    courses
  })

  }
  catch(error){
     return res.json(error.message)
  }
}
//Get educator dashboard data

export const educatorDashboardData = async(req,res)=>{
   try{
   const { userId: educator } = await req.auth();
   const courses = await Course.find({educator})

    let totalCourses = courses.length;
    let totalEarnings = 0;

    const courseIds = courses.map((course)=>{
      return course._id
    })

    const purchases = await Purchase.find({
      courseId:{$in:courseIds},
      status:'completed'
    })

    totalEarnings = purchases.reduce((sum,purchase)=>
      sum + purchase.amount,0
    )
    //Collect unique enroll students id 
    let enrolledStudentsData = []
    for(let course of courses){
      const students = await User.find({
        _id:{$in:course.enrolledStudents}
      },'name imageUrl')
      students.forEach(student=>{
         enrolledStudentsData.push({
          courseTitle:course.courseTitle,
          student
         })
      })
    }
    res.status(200).json({
      success:true,
      dashboardData:{
        
        totalEarnings,
        enrolledStudentsData,
        totalCourses
      }
    })
   }
   catch(err){
      res.status(500).json({
        success:false,
        message:err.message
      })
   }
   
}

// Get Enrolled students Data With Purchase Data

export const getEnrolledStudentsData = async (req,res) => {
  try {

    const { userId: educator } = await req.auth();
    let courses = await Course.find({educator});

    const courseIds = courses.map((course)=>{
      return course._id
    })


     const purchases = await Purchase.find({
      courseId:{$in:courseIds},
      status:'completed'
    }).populate('userId','name imageUrl').populate('courseId','courseTitle')

    const enrolledStudents = purchases.map(purchase=>({
      student:purchase.userId,
      courseTitle:purchase.courseId.courseTitle,
      purchaseDate:purchase.createdAt
    }))


    res.status(201).json({
      success:true,
      enrolledStudents
    })




  } catch (error) {
    res.status(500).json({
      success:false,
      message: error.message
    })
  }
}
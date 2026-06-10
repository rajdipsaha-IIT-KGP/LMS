import Course from "../models/Course.js";
import { CourseProgress } from "../models/courseProgress.js";
import { Purchase } from "../models/purchase.js";
import User from "../models/User.js";
import Stripe from 'stripe'
// User Data

export const getUserData = async (req,res) => {
    try {
        const { userId:userId } = await req.auth();
        const user = await User.findById(userId)

        if(!user)
            return res.status(404).json({ 
          success:false,
                message:"User no found"
            })
        res.status(200).json({
          success:true,
           user
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}


//user enrolled courses with lecture link

export const userEnrolledCourses = async (req,res) => {
    try {
        const { userId:userId } = await req.auth();
        const userData = await User.findById(userId).populate('enrolledCourses')

        res.status(200).json({
          success:true,
          enrolledCourses:userData.enrolledCourses
        })

    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }
}

//For purchasing any course



export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { userId } = await req.auth();
    const {origin} = req.headers

    // Find user and course
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.status(404).json({
        success: false,
        message: "User or Course not found",
      });
    }

    // Check if already enrolled
    const alreadyPurchased = await Purchase.findOne({
      userId,
      courseId,
      status: "completed",
    });

    if (alreadyPurchased) {
      return res.status(400).json({

        success: false,
        message: "Course already purchased",
      });
    }

    // Calculate discounted amount
    const amount =
      courseData.coursePrice -
      (courseData.coursePrice * courseData.discount) / 100;

    // Create purchase
    const newPurchase = await Purchase.create({
      userId,
      courseId,
      amount,
      status: "pending",
    });
// Stripte Gateway 

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
console.log("origin:", req.headers.origin);
console.log("userId:", userId);
console.log("courseId:", courseId);
console.log("STRIPE_KEY exists:", !!process.env.STRIPE_SECRET_KEY);
console.log("CURRENCY:", process.env.CURRENCY);
const currency = process.env.CURRENCY.toLowerCase()
console.log("currency",currency)

//Creating Line items for stripe

const line_items = [{
    price_data:{
        currency,
        product_data:{
            name:courseData.courseTitle
        },
        unit_amount:Math.floor(newPurchase.amount)
    },
    quantity:1
}]

const session = await stripeInstance.checkout.sessions.create({
    success_url:`${origin}/loading/my-enrollments`,
    cancel_url:`${origin}`,
    line_items:line_items,
    mode:'payment',
    metadata:{
        purchaseId:newPurchase._id.toString()
    }
})

res.status(200).json({
    success:true,
    session_url:session.url
})
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update user course progress

export const updateUserCourseProgress = async (req,res) => {
  try {
    const {userId} = await req.auth()
    const{courseId,lectureId} = req.body

    const progressData = await CourseProgress.findOne({
      userId,courseId
    })

    if(progressData){
      if (progressData.lectureCompleted.some(id => id.toString() === lectureId))
        return res.json({
           success:true,
           message:"Lecture already completed"
        })
        progressData.lectureCompleted.push(lectureId)
       await progressData.save()
    }
    else{
      await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted:[lectureId]
      })
    }

    return res.status(200).json({
      success:true,
      message:"Progress Udated"
    })



  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


//get User Course Progress

export const getUserCourseProgress = async (req,res) => {
  try {
     const {userId} = await req.auth()
    const{courseId} = req.body

    const progressData = await CourseProgress.findOne({
      userId,courseId
    })
    res.status(201).json({
      success:true,
      progressData
    })
  } catch (error) {
     return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

//Add user rating to course


export const addUserRating = async (req,res) => {
   try {
    const {userId} = await req.auth()
    const{courseId,rating} = req.body

    if(!userId || !courseId || !rating || rating < 1 || rating > 5)
      return res.status(400).json({
    success:false,
        message:"Invalid Credentials"
      })
      const course = await Course.findById(courseId);


      if(!course)
        return res.status(400).json({
      success:false,
        message:"Course not found"
      })

      const user = await User.findById(userId)
       if(!user || !user.enrolledCourses.includes(courseId))
        return res.status(400).json({
      success:false,
        message:"You can't rate the course"
      })

      const existingRatingIndex = course.courseRatings.findIndex(r=>r.userId.toString() === userId)

      if(existingRatingIndex > -1){
         course.courseRatings[existingRatingIndex].rating = rating
      }
      else{
          course.courseRatings.push({userId,rating})
      }
      await course.save()
      return res.status(200).json({
        success:true,
        message:"Rating Added"
      })
   } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
   }
}
import Course from "../models/Course.js";
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
                message:"User no found"
            })
        res.status(200).json({
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
const currency = process.env.CURRENCY.toLowerCase()
console.log("currency",currency)

//Creating Line items for stripe

const line_items = [{
    price_data:{
        currency,
        product_data:{
            name:courseData.courseTitle
        },
        unit_amount:Math.floor(newPurchase.amount)*100
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
import { Webhook } from "svix";
import  User from '../models/User.js'
import Stripe from "stripe";
import { Purchase } from "../models/purchase.js";
import Course from "../models/Course.js";

//API Controller function to manage clerk users

export const clerkWebhooks = async(req,res)=>{
  try{
     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

     await whook.verify(JSON.stringify(req.body),{
        "svix-id":req.headers["svix-id"],
        "svix-timestamp":req.headers["svix-timestamp"],
        "svix-signature":req.headers["svix-signature"]
     })
     const {data,type} = req.body
     switch (type) {
        case 'user.created':{
            const userData = {
                _id:data.id,
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                imageUrl:data.image_url
            }
            await User.create(userData)
            res.json({
                message:"User creted"
            })
            break;
        }
            
        case 'user.updated':{
            const userData = {
                email:data.email_address[0].email_address,
                name:data.first_name + " " + data.last_name,
                imageUrl:data.image_url
            }
            await User.findByIdAndUpdate(data.id,userData)
            res.json({
                message:"User Updated"
            })
            break;
        } 

        case 'user.deleted':{
            await User.findByIdAndDelete(data.id)
            res.json({
                message:"User deleted"
            })
            break;
        }
     
        default:
            break;
     }
  }
  catch(err){
      res.json({
        success:false,
        message:err.message
      })
  }
}

//STRIPTE webhoooks

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature verification failed:", err.message);

    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {

      case "payment_intent.succeeded": {

        const paymentIntent = event.data.object;

        const sessions = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        if (!sessions.data.length) {
          return res.status(400).json({
            success: false,
            message: "Session not found",
          });
        }

        const session = sessions.data[0];

        const { purchaseId } = session.metadata;

        const purchaseData = await Purchase.findById(purchaseId);

        if (!purchaseData) {
          return res.status(404).json({
            success: false,
            message: "Purchase not found",
          });
        }

        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId);

        if (!userData || !courseData) {
          return res.status(404).json({
            success: false,
            message: "User or Course not found",
          });
        }

        // prevent duplicate enrollments
        if (!userData.enrolledCourses.includes(courseData._id)) {
          userData.enrolledCourses.push(courseData._id);
          await userData.save();
        }

        if (!courseData.enrolledStudents.includes(userData._id)) {
          courseData.enrolledStudents.push(userData._id);
          await courseData.save();
        }

        purchaseData.status = "completed";
        await purchaseData.save();

        console.log("Purchase completed:", purchaseId);

        break;
      }

      case "payment_intent.payment_failed": {

        const paymentIntent = event.data.object;

        const sessions = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        if (sessions.data.length) {
          const session = sessions.data[0];

          const { purchaseId } = session.metadata;

          const purchaseData = await Purchase.findById(purchaseId);

          if (purchaseData) {
            purchaseData.status = "failed";
            await purchaseData.save();
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.json({
      received: true,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
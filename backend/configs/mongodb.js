import mongoose from "mongoose";

// conncect to the MONGODB the database
const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log('Database connected')
    })
    await mongoose.connect(`${process.env.MONGO_URL}/LMS`)
}
export default connectDB

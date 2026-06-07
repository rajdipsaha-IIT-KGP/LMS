import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'


//Intialize express
const app = express()


// Connect to Database
await connectDB()

//Middlewares
app.use(cors())
app.use(clerkMiddleware())

//Routes
app.get('/',(req,res)=>{
  res.send("API working")
})
app.post('/clerk',express.json(),clerkWebhooks)
app.use('/api/educator',express.json(),educatorRouter)

//PORT

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
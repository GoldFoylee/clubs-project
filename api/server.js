import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config()
app.use(express.json())
app.use(cookieParser())



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})
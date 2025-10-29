import express from 'express'
const app = express();
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
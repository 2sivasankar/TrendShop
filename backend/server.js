const express=require('express') //express importing
const cors =require('cors') //cors to communicate between frontend and backend
const mongoose=require('mongoose')
require('dotenv').config();
const app=express();
app.use(cors());


mongoose.connect(process.env.MONGO_URL).
then((result)=> 
    app.listen(process.env.PORT,()=>{
    console.log("Server is running ....");
})
).catch((error)=>console.log("Database is not connected",error));
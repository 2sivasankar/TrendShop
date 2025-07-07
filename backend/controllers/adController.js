const Ad=require('../models/Ad');
const express=require('express');
const app=express();
app.use(express.json());
const axios=require('axios');

//recaptcha verification
const verifyRecaptcha =async (token)=>{
    const secret =process.env.RECAPTCHA_SECRET;
    const response=await axios.post(`https://www.google.com/recaptcha/api/siteverify`,null,{
        params:{
            secret,
            response:token,
        },
    });
    return response.data.success;
};


//posting ad
const postAd=async (req,res)=>{

    try{
      
    const {title,description,price,pincode,category,userId,captchaToken}=req.fields;
 //   const imagePath=req.file ? req.file.filename :null;
        console.log("received data",req.body);
        console.log("title:", title);
console.log("description:", description);
console.log("price:", price);
console.log("pincode:", pincode);
console.log("category:", category);
console.log("userId:", userId);
console.log("captchaToken:", captchaToken);
//console.log("file:", imagePath);


        if(!title || ! description || !price || !pincode || !category || !userId || !captchaToken ){
                        console.log("Validation failed: missing fields");
                        return res.status(400).json({message:"All fields are required"});

        }

         //verification of recaptcha
        const isHuman=await verifyRecaptcha(captchaToken);
        if(!isHuman){
            return res.status(400).json({message:"recaptcha failed,Are you a robot ?"});
        }

            const ad=await Ad.create({title,description,category,price,pincode,userId});
            res.status(201).json(ad);
        

    }catch(error){
        console.error("Error during the posting",error);
        res.status(500).json({message:"server error"});
    }
};


const getAllAds= async (req,res)=>{
    try{
        const ads=await Ad.find();
        res.status(200).json(ads);

    }catch(error){
        res.status(500).json({messsage:"Failed to fetch ads",error});
    }
};


module.exports={postAd,getAllAds};
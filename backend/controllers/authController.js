const User=require('../models/User');
const jwt=require('jsonwebtoken')
const express=require('express');
const bcrypt=require('bcryptjs');
const app=express();
app.use(express.json());
//Registring a user
const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
                    console.log("Received data:", req.body);

        //Validating a data;
        if(!name || !email || !password){
            console.log("Validation failed: missing fields");

            return res.status(400).json({message:"All fields are required"});
        }
        //Check if user exists
                console.log("Validation passed");

        const userExists=await User.findOne({email});
        if(userExists){
                        console.log("User exists");

            return res.status(400).json({message:"User already exists"});
        }
        const user =await User.create({
            name,
            email,
            password
        });

        //Generate a token

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn :'7d'});
                console.log("User created successfully");

        res.status(201).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    } catch(error){
        console.error("Error during registration:", error);

    res.status(500).json({message:'server error'});
}
};



//Login user

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
                   console.log("Received data:", req.body);

        //validate
        if(!email || !password){

            return res.status(400).json({message:"Email and password is required"});
        }
        //check if user exists       
        const user=await User.findOne({email});
        if(!user){
                                    console.log("User not exists");

            return res.status(400).json({message:"Invalid credintials"});
        }
        //check if password matches
        const isMatches=await bcrypt.compare(password,user.password);
        if(!isMatches){
            console.log("Password is not matched");

            return res.status(400).json({message:"Invalid credintials"});    
        }
            console.log("token generating");

        //generating token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});


        //sendingg the response
        res.status(201).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email  
            }
        });
    }catch(error){

        res.status(500).json({message:'server error'});
    }
};


module.exports={
    registerUser,
    loginUser
};
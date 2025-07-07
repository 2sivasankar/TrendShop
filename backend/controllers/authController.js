const express=require('express');
const User=require('../models/User');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const axios=require('axios');
const {OAuth2Client}=require('google-auth-library');
const googleClient=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const app=express();
const crypto=require('crypto');
const nodemailer=require('nodemailer');

app.use(express.json());


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

//Registring a user
const registerUser=async (req,res)=>{
    try{
        const {name,email,password,captchaToken}=req.body;
                    console.log("Received data:", req.body);

        //Validating a data;
        if(!name || !email || !password || !captchaToken){
            console.log("Validation failed: missing fields");

            return res.status(400).json({message:"All fields are required"});
        }
        //verification of recaptcha
        const isHuman=await verifyRecaptcha(captchaToken);
        if(!isHuman){
            return res.status(400).json({message:"recaptcha failed,Are you a robot ?"});
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
        const {email,password ,captchaToken}=req.body;
                   console.log("Received data:", req.body);

        

        //validate
        if(!email || !password || !captchaToken ){

            return res.status(400).json({message:"Email and password is required"});
        }
         //verification of recaptcha
        const isHuman=await verifyRecaptcha(captchaToken);
        if(!isHuman){
            return res.status(400).json({message:"recaptcha failed,Are you a robot ?"});
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



//GOOGLE authentication handler
const googleAuth =async (req,res) =>{
    const {credential}=req.body;
        console.log("Received Google Credential at backend:", credential); // <-- Add this

    try{
        //1.verifying token with google
        const ticket=await googleClient.verifyIdToken({
            idToken:credential,
            audience:process.env.GOOGLE_CLIENT_ID,
        });
        const payload =ticket.getPayload();
        //2. finding in db or creating in your db
        let user=await User.findOne({email:payload.email});
        if(!user){
            user=await User.create({
                name:payload.name,
                email:payload.email,

                //generating  a random password
                password:payload.sub,
                googleId:payload.sub,

            });
    }
    //3.Issue your own JWT token
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:'7d',
    });

    //4.return the token and the user information

    res.json({
        token,
        user:{
            id: user._id,
            name:user.name,
            email:user.email
        }
    });
    
}catch(err){
    console.error("Google Auth error",err);
    res.status(500).json({message:"Google authentication failed"});
}

};

// forgot password
const forgotPassword =async(req,res)=>{
    const {email}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"user not exists"});

        //generating token
        const  resetToken=crypto.randomBytes(32).toString("hex");
        const resetTokenHash=crypto.createHash('sha256').update(resetToken).digest('hex');

        //save hashed token and expairy in user docs

        user.resetPasswordToken=resetTokenHash;
        user.resetPasswordExpires=Date.now()+3600000;
        await user.save();


        const resetLink=`http://localhost:3001/reset-password/${resetToken}`;

        //setUp email
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            to:user.email,
            subject:"Password Reset",
            html:`<p>Click <a href=${resetLink}>here</a> to reset your password.The link expires in 1hour.</p>`

        });

        res.json({message:"Password reset sent to email"});


    }catch(error){
        console.error("Forgot password error",error);
        res.status(500).json({message:"server error"});

    }

};

//reset password
const resetPassword=async(req,res)=>{
    const {token}=req.params;
    const {newPassword}=req.body;
    const resetTokenHash=crypto.createHash('sha256').update(token).digest('hex');
    
    try{
        //find user using hashed token and check expiry
        const user= await User.findOne({
            resetPasswordToken:resetTokenHash,
            resetPasswordExpires:{$gt:Date.now()}

        });
     if(!user) return res.status(400).json({message:"Invalid and expired token"});
     
     //updatting the password and cleaning the tokens;
     user.password=newPassword;
     user.resetPasswordToken=undefined;
     user.resetPasswordExpires=undefined;
     await user.save();
     res.json({message:"Password has been reseted successfully"});

    }catch(error){
        console.error("Reset password error:",error);
        res.status(500).json({message:"server error"});

    }
};









module.exports={
    registerUser,
    loginUser,
    googleAuth,
    forgotPassword,
    resetPassword
};
const User=require('../models/User');
const jwt=require('jsonwebtoken')
//Registring a user
const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        //Validating a data;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        //Check if user exists
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const user =await User.create({
            name,
            email,
            password
        });

        //Generate a token

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn :'7d'});
        
        res.status(201).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    } catch(error){

    res.send(500).json({message:'server error'});
}
};



//Login user

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        //validate
        if(!email || !password){
            return res.status(400).json({message:"Email and password is required"});
        }
        //check if user exists       
        const user=await User.findOne({email});
        if(!user){
            return res.send(400).json({message:"Invalid credintials"});
        }
        //check if password matches
        const isMatches=await bcrypt.compare(password,user.password);
        if(!isMatches){
            return res.send(400).json({message:"Invalid credintials"});
        }

        //generating token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    }catch(error){
        res.status(500).json({message:'server error'});
    }
};


module.exports={
    registerUser,
    loginUser
};
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');

const User=require('../models/User');

const protect=async (req,res,next) =>{
    let token;
    //check if autherization header starts with Bearer
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //header is Bearer <token>
            //getting only the token part only
            token=req.headers.authorization.split(' ')[1];
            //verifing the token using the sceret
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //fetching all the date except the users data without password
            req.user=await User.findById(decoded.id).select('-password');
            //calli catchng the next
            next();
        } catch(error){
            console.error(error);
            //Token is invalid
            res.status(401).json({message: 'Not  Authorized,token failed'});
        }
    }
    if(!token){
        res.status(401).json({message:'Not authorized, No token'});
    }
};


//uploading imagaes
const storage= multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/'); //folder to save images
    },
    filename(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});
//file type checking
const fileFilter=(req,file,cb)=>{
    const allowedTypes=/jpeg|jpg|png|webp/;
    const ext=path.extname(file.orignalname).toLowerCase();
    const mime=file.mimetype;


    if(allowedTypes.test(ext)  &&  allowedTypes.test(mime)){
        cb(null,true);

    }else{
        cb(new Error('Only image files are uploaded',false));   //reject the file
    }
};

const upload =multer({
    storage,
    limits:{fileSize:5*1024*1024},
    fileFilter,
});
module.exports={protect};


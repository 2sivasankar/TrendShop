const mongoose=require('mongoose');
const adSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true        
    },
    price:{
        type:Number,
        required:true,
    },
    pincode:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
   image:String
    });
    



    
    module.exports=mongoose.model('Ad',adSchema);
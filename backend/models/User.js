const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    resetPasswordToken :String,
    resetPasswordExpires:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
});
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
module.exports=mongoose.model('User',userSchema)
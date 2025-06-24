const express=require('express') //express importing
const cors =require('cors') //cors to communicate between frontend and backend
const mongoose=require('mongoose')
require('dotenv').config();
const app=express();
const userRoutes=require('./routes/userRoutes')
app.use(cors());
app.use(express.json());
app.use('/api/users',userRoutes);

app.get('/sayHello',(req,res)=>{
    res.send('HelloWorld friends');
})

mongoose.connect(process.env.MONGO_URL).
then((result)=> 
    app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}....`);
})
).catch((error)=>console.log("Database is not connected",error));

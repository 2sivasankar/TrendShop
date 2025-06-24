const express=require('express');
const router=express.Router();
const {registerUser}=require('../controllers/authController');
const {loginUser}=require('../controllers/authController')
router.post('/register',registerUser);
router.get('/login',loginUser);
module.exports=router;
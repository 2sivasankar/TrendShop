const express=require("express");
const router=express.Router();
const formidable = require("express-formidable");
const {postAd,getAllAds}=require('../controllers/adController')
//const {protect,upload}=require('../middlewares/authMiddleware');
router.post('/post',formidable(),postAd);
router.get('/',getAllAds);
module.exports=router;

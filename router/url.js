const express=require('express');

const {handleGenerateUrl,handleGetAnalytics}=require('../controllers/url');

const router=express.Router();

router.post("/",handleGenerateUrl);

router.get("/analytics/:shortid", handleGetAnalytics);

module.exports=router;
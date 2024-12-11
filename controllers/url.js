const shortid=require("shortid");
const URL=require('../models/url');

async function handleGenerateUrl(req,res){
    const body=req.body;
    if(!body.url)
        return res.status(400).json({error:"Required URL!\n"});
    const result=await URL.findOne({originalUrl:body.url});
    if(result){
        result.visitHistory.push({timestamp: new Date()});
        await result.save();
        return res.render("html",{short_id:result.shortId});
    }
    const shortId=shortid();
    await URL.create({
        shortId:shortId,
        originalUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id
    });
    return res.render("html",{short_id:shortId});
}

async function handleGetAnalytics(req,res){
    const id=req.params.shortid;
    const data=await URL.findOne({shortId:id});
    if(!data)
        res.status(400).send("No such short Id Generated yet!\n");
    return res.json({
        totalClicks:data.visitHistory.length,
        analytics:data.visitHistory
    });
}

module.exports={handleGenerateUrl,handleGetAnalytics};
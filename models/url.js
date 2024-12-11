const mongo=require('mongoose');

const urlSchema=new mongo.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    originalUrl:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}],
    createdBy:{
        type:mongo.Schema.Types.ObjectId,
        ref:"users" 
    }
},{timestamps:true});

const URL=mongo.model('url',urlSchema); 

module.exports=URL;
const mongo=require('mongoose');

const userSchema=new mongo.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'NORMAL'
    }
},{timestamps:true});

const User=mongo.model('users',userSchema);

module.exports=User;
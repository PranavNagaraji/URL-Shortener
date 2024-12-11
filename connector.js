const mongo=require('mongoose');
 
async function connectMongo(url){
    return mongo.connect(url);
}

module.exports={connectMongo};
const express=require('express');
const {connectMongo}=require('./connector');
const URL=require('./models/url');
const path=require('path');
const cookieParser=require('cookie-parser')

const {checkForAuthentication, restrictTo}=require('./middleware/auth');

const urlRoute=require('./router/url');
const staticRoute=require('./router/staticrouter');
const userRoute=require('./router/user');

const app=express();

app.set('view engine','ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

const PORT=8008;
 
//check out if it is mongodb://localhost:27017/urlshortener or this
connectMongo('mongodb://127.0.0.1:27017/urlshortener')
.then(()=>console.log("MongoDB is connected!\n"))
.catch(()=>console.log(err,"Error and MongoDB is not connected!\n"));

app.use(checkForAuthentication);
app.use("/url",restrictTo(["NORMAL", "ADMIN"]),urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);

app.get('/url/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    });
    if(entry)
        return res.redirect(entry.originalUrl);
    else
        return res.status(400).send("No such shortened Url available!\n");
});

app.listen(PORT,()=>console.log(`server connected at ${PORT}\n`));
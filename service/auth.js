const jwt =require('jsonwebtoken');

const secret = "Pranav@123$$";

function setUser(user){
    return jwt.sign({   
        _id:user.id,
        email:user.email,
        role:user.role
    }, secret);
}

function getUser(token){
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return null;
    }
}

module.exports={
    setUser,
    getUser
}
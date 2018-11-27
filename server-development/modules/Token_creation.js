
var jwt = require('jsonwebtoken');

exports.signtoken = (newuserID,newuserEmail)=>{
    return jwt.sign({
        iss:"CMS_WEBSITE",
        sub:newuserID,
        email: newuserEmail,
        iat: new Date().getTime(), 
        exp: new Date().setDate(new Date().getDate() + 1) 

    }, process.env.SECRET_KEY);
}
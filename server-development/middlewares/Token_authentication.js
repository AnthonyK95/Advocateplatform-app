var jwt = require('jsonwebtoken');

// require the key for authentication
require('dotenv').config()

// Checking the authentication of Users->Token
module.exports = (req,res,next)=> {
    try{
        const token = req.headers.authorization
        const decoded_token = jwt.verify(token, process.env.SECRET_KEY);

        // Checking for the expiration date
        if(Date.now() > decoded_token.exp){
            res.json('Expired')
        }
        else{
            // Returning the data to the request
            req.userID = decoded_token.sub
            next();
        }
    }
    catch(error){
        return res.status(200).json({
            message:"Authentication Failed"
        });
    }
}

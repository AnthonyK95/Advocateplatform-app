let Device = require('../models/device');


//Searching the database for user_id -> devices
exports.DeviceCounting = (user_id) => {
    let thedata = [];
    Device.find({assignedUser:user_id},(err,data)=>{
        if(err){
            throw err;
        }
        else{
            thedata.push(data.username)
            // console.log(thedata)
        }
    });
    
}

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const requested_token = require('./modules/Token_creation');
const Token_authentication = require('./middlewares/Token_authentication');


// Requiring environment variables
require('dotenv').config();



//Importing Database Models
let User = require('./models/users');
let Device = require('./models/device');
let Contract = require('./models/contract');
let ConfirmedContract = require('./models/confirmedContract');

//Setting Mongoose and choosing database => Remote Connection to the vm server
mongoose.connect('mongodb://192.168.10.10:27017/ADvoCate', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
// Allowing Acces Control via Jwt token header method using cors
var corsOptions = {
    allow:'Access-Control-Allow-Origin',
    optionsSuccessStatus: 200
};

//Using Cors 
app.use(cors(corsOptions));
//Using BODY-PARSER
app.use(bodyParser.json());

// TODO: repspond with the notification system
// FIXME: Login to the platform
app.post('/api/login',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({email: email, password: password}, (err,newuser) => {
        if(err){
            console.log(err)
        }
        else if(!newuser){
            res.json('Authentication Failed')
        }
        else{
            let generate_token = requested_token.signtoken(newuser._id,newuser.email);
            res.status(200).json(generate_token);
        }
    });
});

// FIXME: working register api
// Register a new user
app.post('/api/register', async(req,res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    // Model creation for the credentials
    const newuser = new User({
        _id:new mongoose.Types.ObjectId()
        ,email:email,
        username:username,
        password:password
    });
    // Creating the token with users credentials
    const token = requested_token.signtoken(newuser._id,newuser.email);
    // Saving to the database
    await newuser.save();
    res.status(200).json(token);
 });



// FIXME: validate dashboard and returns the some User Information
app.use('/api/validation',Token_authentication,(req,res)=>{
    User.findOne({_id:req.userID},(error,user_data)=>{
        if(error){
            console.log(error);
        }
        res.status(200).json({message:user_data.username});
    });
});

// FIXME: Sending back the devices ->Working Great
app.use('/api/devices',Token_authentication,(req,res)=>{
    //Sending the list of devices
      Device.find({assignedUser:req.userID},(err,data)=>{
        res.status(200).json({response:data});
    });
});

// FIXME: Send the props of the devices -> User._id
app.use('/api/device/properties',Token_authentication,(req,res)=>{
    let deviceID = req.body.deviceID
    Device.findOne({_id:req.body.deviceID},(err,data)=>{
        res.status(200).json({properties:data});
    });
});


// FIXME: update the devices -> userInput
app.use('/api/device/update',Token_authentication,(req,res)=>{
    Device.findOneAndUpdate({_id:req.body.updateInfo.deviceID},
      {deviceName:req.body.updateInfo.deviceName,deviceType:req.body.updateInfo.deviceType},(err,response)=>{
        if(err){
            console.log(err)
        }
        else{
            Contract.findOneAndUpdate({assignedUser:req.userID},{deviceName:req.body.updateInfo.deviceName,deviceType:req.body.updateInfo.deviceType})
            res.status(200).json({message:'success'});
        }
    });
});

//FIXME: deleting the devices -> deviceID
app.use('/api/dashboard/devices/delete',Token_authentication,(req,res)=>{
    let deviceID = req.body.deviceID
    Device.findOneAndRemove({_id:deviceID},(err,response)=>{
        if(err){
            console.log(err);
        }
        else{
            Contract.findOneAndDelete({assignedUser:deviceID},(err,response)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.status(200).json({message:'success'});
                }
            })
        }
    })
});


// Preview the history of the Contracts -> Active TODO: dont know if it works
app.use('/api/dashboard/contractHistory',Token_authentication,(req,res)=>{
    ConfirmedContract.find({assignedUser:req.userID},(err,responde_contracts)=>{
        if(error) throw error;
        else{
            console.log(error);
        }
    });
});


//TODO:Searching for the active contract informations
app.use('/api/devprops/activeContract',Token_authentication,(req,res)=>{

})


// FIXME: Notification System
app.use('/api/dashboard/notification',Token_authentication,(req,res)=>{
    Contract.find({assignedUser:req.userID,status:"pending"},(err,dataController)=>{
       if(err){
           console.log(err);
       }
       else{
           res.status(200).json({notification:dataController,notification_counter:dataController.length});
       }
    })
});


// FIXME: Registers the new device to db
app.use('/api/dashboard/registerDevice',Token_authentication,(req,res,next)=>{
    //Requesting the data from the user  
    const dataForWriting = new Device({
        _id:new mongoose.Types.ObjectId(),
        deviceVendor:'samsung',
        deviceName: req.body.deviceNames,
        deviceType: req.body.deviceTypes,
        deviceSerialKey: req.body.deviceKeys,
        assignedUser: req.userID
    });
    //Saving the data to database
    dataForWriting.save();
    res.status(200).json({correct:'correct'});
});

// aquire the contract information with the exact -> id 
app.use('/api/dashboard/reqcontractConsent',Token_authentication,(req,res)=>{
    let contractID = req.body.IDcontract
    Contract.findOne({_id:contractID},(err,response)=>{
        res.status(200).json({information:response});
    })
})


// TODO: create will all the data that we have the confirmed contract
app.use('/api/dashboard/postcontractConsent',Token_authentication,(req,res)=>{
    // Array with the data that has been accepted by the user
    let confirmed =  req.body.confirmed
    let contractId = req.body.contractID
    console.log(confirmed)
    Contract.findOneAndUpdate({_id:contractId},{Client_Consent:confirmed,status:'Confirmed'},(err,response)=>{
      if(err){
          throw err;
      }
      else{
        // Create the hash from the response data array
        let to_hash = JSON.stringify(response)
        let hash = crypto.createHash('sha256').update(to_hash).digest('hex');
        Contract.findOneAndUpdate({_id:contractId},{Client_Signature:hash},(err,contract_response)=>{
            if(err){
                throw err;
            }
            else{
                Device.findOneAndUpdate({_id:contract_response.deviceID},{activeContract:contract_response._id},(err,response)=>{
                    res.status(200).json({message:'success'});
                });
              }
          })
      }})    
});


// TODO: no need to authenticate with token
//Temporary API for sending the devices to the vendor-> Requesting the devices to show from the contacts
app.use('/api/company/contractCreation',(req,res)=>{
 let code = req.body.postCodeRequest;
     if(code === true) {
         Device.find({deviceVendor:"samsung"},(err,dataController)=>{
            if(err){
                console.log(err);
            }
            else {
                res.status(200).json({data:dataController});
            }
        });

     }
});

// Requesting the data from the server to compose the json info
// Sending the information with contract id for response -> sign contract
app.use('/api/company/requestContract',(req,res)=>{

    let contractId = req.body.variable;
    Device.findOne({_id:contractId},(err,dataController)=>{
        //Creating the contract
        let requestedContract = new Contract({
            _id:new mongoose.Types.ObjectId(),
            status:"pending",
            deviceID:dataController._id,
            deviceVendor: dataController.deviceVendor,
            deviceName: dataController.deviceName,
            deviceType:dataController.deviceType,
            deviceSerialKey:dataController.deviceSerialKey,
            assignedUser: dataController.assignedUser,
            data:{
                Data_Requested_One:'Uptime data will be collected periodically',
                Data_Requested_Two:'Location data will be collected periodically'
            },
            // Time_Period:"We are going to Collect data Until August 5 2019",
            Purposes:{
                Purposes_Requested_One:"Uptime data will be used to identify potential bugs",
                Purposes_Requested_Two:"Identity Verification Of User with Login Establish Geolocation",
            },
            Third_Parties:"We are going to share the data with Wayne Enterprise,",
            Third_Countries:"We are going to share your data with Non-Eu Recipients",
            Company_Signature:'',
            Automated_Processing:true,
            Profiling:true,
            Manual_Process:true
        });
        
        //Temporary Code -> Creating the hash string
        let to_hash =requestedContract.deviceID+requestedContract._id+requestedContract.status+requestedContract.deviceVendor+requestedContract.deviceName
            +requestedContract.deviceType+requestedContract.deviceSerialKey+requestedContract.assignedUser+requestedContract.data.Data_Requested_One
            +requestedContract.data.Data_Requested_Two+requestedContract.Time_Period+requestedContract.Purposes_One+requestedContract.Purposes_Two
            +requestedContract.Third_Countries+requestedContract.Third_Parties+requestedContract.Automated_Processing+requestedContract.Profiling+requestedContract.Manual_Process;

        let hash = crypto.createHash('sha256').update(to_hash).digest('hex');
        requestedContract.Company_Signature = hash;
        requestedContract.save();
    });
     res.status(200).json({response:contractId});
});




// FIXME: General Components Build -> Informations Only -> Counting the devices->Not used
app.use('/api/dashboard/countDevice',Token_authentication,async (req,res)=>{
    let devices;
    let contracts;
     Device.find({assignedUser:req.userID},(err,response)=>{
        if(err) throw err;
        else{
            this.devices = response.length
        }
    })
   await Contract.find({assignedUser:req.userID,status:'confirmed'},(err,response)=>{
        if(err) throw err;
        else{
            this.contracts = response.length
        }
    })
    res.status(200).json({deviceCount:this.devices,contractCount:this.contracts})
});












// Server Initialization -> Properties Configured by the host.env file
app.listen(3001, () => console.log('Application is running'));

module.exports = app;

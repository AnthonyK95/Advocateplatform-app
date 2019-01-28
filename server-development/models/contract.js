var mongoose = require('mongoose');

//Creating the Contract Schematics
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status:String,
    deviceID:String,
    deviceVendor: String,
    deviceName: String,
    deviceType:String,
    deviceSerialKey:String,
    assignedUser: String,
    data:{
        Data_Requested_One:String,
        Data_Requested_Two:String
    },
    Time_Period:String,
    Purposes:{
        Purposes_Requested_One:String,
        Purposes_Requested_Two:String
    },
    Third_Parties:String,
    Third_Countries:String,
    Company_Signature:String,
    Client_Consent:String,
    Client_Signature:String,
    ID_Transaction:String,
    Automated_Processing:Boolean,
    Profiling:Boolean,
    Manual_Process:Boolean
});

//Export the user model to the project
var Contract = mongoose.model('Contract', userSchema);
module.exports = Contract;

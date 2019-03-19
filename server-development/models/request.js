var mongoose = require('mongoose');

//Creating The JSON Request Format
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Controller:String,
    Status:String,
    DataSubjectID:String,
    DataSubject:{
        Firstname:String,
        Lastname:String,
        Age:Number
    },
    PersonalData:String,
    SensitiveData:Boolean,
    ControllerSignature:String,
    DataProcessing:{
        ProcessingActivity:String,
        ProcessingMode:Boolean,
        Profiling:Boolean,
        Retention:String,
        Recipient:{
            EURecipient:String,
            NonEURecipient:String
        }
    },
    DeviceType:String,
    DeviceID:String, 
});

//Exporting the Request Format 
var request = mongoose.model('request', userSchema);
module.exports = request;

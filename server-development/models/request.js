var mongoose = require('mongoose');

//Creating The JSON Request Format
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Controller:String,
    DataSubject:{
        firstname:String,
    },
    PersonalData:String,
    SensitiveData:Boolean,
    DataProcessing:{
        ProcessingActivity:String,
        ProcessingMode:Boolean,
        Profiling:Boolean,
        Recipient:{
            EURecipient:String,
            NonEURecipient:String
        }
    }


   
});

//Exporting the Request Format 
var request = mongoose.model('request', userSchema);
module.exports = request;
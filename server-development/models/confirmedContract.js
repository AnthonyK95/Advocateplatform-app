var mongoose = require('mongoose');

//Creating the user schema
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Company_Signature:String,
    Client_Signature:String,
    Timestamp:String
});

//Export the user model to the project
var ConfirmedContracts = mongoose.model('ConfirmedContracts', userSchema);
module.exports = ConfirmedContracts;

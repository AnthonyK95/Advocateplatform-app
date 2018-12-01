var mongoose = require('mongoose');

//Creating the Device Schema
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    deviceVendor: String,
    deviceName: String,
    deviceType:String,
    deviceSerialKey:String,
    assignedUser: String,
    blockchainID:String,
    activeContract:String
});

//Export the user model to the project
var Device = mongoose.model('Device', userSchema);
module.exports = Device;

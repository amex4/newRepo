const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    role: { type: String, enum: ['superadmin', 'user'], default: 'user' }
});

module.exports = mongoose.model('User',userModel);
const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    token:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Admin',adminSchema,'admins')
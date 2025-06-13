const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    user_name:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        required: true
    },
    nick_name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    logs:{
        type: Array,
        required: true
    },
})
module.exports = mongoose.model('Admin',adminSchema,'admins')
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
    logs:{
        type: Array,
        required: true,
        default:[0,0,0]
    },
    token:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Admin',adminSchema,'admins')
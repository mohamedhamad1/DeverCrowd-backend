const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    numberphone:{
        type: Number,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    knownby:{
        type: String,
        required: true
    },
    requestedservices:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true, 
        default: Date.now(),
    }
})
module.exports = mongoose.model('Message',messageSchema,'messages') 
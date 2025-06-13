const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
    user_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    number_phone:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        default: 0
    },
    title:{
        type: String,
        required: true
    },
    known_by:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    messageId:{
        type: Number,
        required: true,
        unique: true,
    }
})
module.exports = mongoose.model('Contact',contactSchema,'contacts')
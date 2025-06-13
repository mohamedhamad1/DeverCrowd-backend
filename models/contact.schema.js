const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
    username:{
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
    description:{
        type: String,
        default: 0
    },
    title:{
        type: String,
        required: true
    },
    knownby:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    messageid:{
        type: Number,
        required: true,
        unique: true,
    }
})
module.exports = mongoose.model('Contact',contactSchema,'contacts')
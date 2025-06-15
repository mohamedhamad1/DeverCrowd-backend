const mongoose = require('mongoose');
const roles = require('../utils/adminRoles')
const adminSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        required: true,
        enum: Object.values(roles)
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

adminSchema.virtual("tasks",{
    ref: "Log",
    localField: '_id',
    foreignField: 'owner',
})

adminSchema.set('toObject', { virtuals: true });
adminSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Admin',adminSchema,'admins')
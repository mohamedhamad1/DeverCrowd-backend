const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    assingedTo:{
        type:Array,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['done', 'in progress',],
        required:true
    },
    references:{
        type:String,
        required:true
    },
    createdat:{
        type:Date,
        required:true,
        default:Date.now()
    }

})

module.exports = mongoose.model("Task", taskSchema, "tasks")
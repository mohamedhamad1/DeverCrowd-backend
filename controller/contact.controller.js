const errorHandler = require('../utils/errorHandler')
const Contact = require('../models/contact.schema')
const httpStatus = require('../utils/httpStatus')

const sendForm = async(req,res)=>{ //swilam
    res.json({data:"test"})
}

module.exports = {
    sendForm
}
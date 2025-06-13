const errorHandler = require('../utils/errorHandler')
const Message = require('../models/message.schema')
const httpStatus = require('../utils/httpStatus')

const sendForm = async(req,res)=>{ //swilam
    const {username, email, numberphone, description,title, knownby} = req.body
    const newMessage = new Message({
        username,
        email,
        numberphone,
        description,
        title,
        knownby
    })
    await newMessage.save();
    res.json({status:201, message:httpStatus.STATUS.success, data:{newMessage}})
}


module.exports = {
    sendForm
}
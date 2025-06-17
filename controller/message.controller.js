const errorHandler = require('../utils/errorHandler')
const Message = require('../models/message.schema')
const httpResponse = require('../utils/httpResponse')
const asyncWrapper = require('../middlewares/asyncWrapper')
const { sendMail, sendAutoReply } = require('../config/mailer');

const sendForm = asyncWrapper(async(req,res, next)=>{ 
    const {name, email, numberphone, message,title, knownby, requestedservices} = req.body
    const newMessage = new Message({
        name,
        email,
        numberphone,
        message,
        title,
        knownby,
        requestedservices
    })
    await newMessage.save();
    await sendMail({ name, email, numberphone, message,title, knownby, requestedservices });
    await sendAutoReply({ name, email });
    res.json({status:httpResponse.status.created , message: httpResponse.message.messageCreated, data:{newMessage}})
})


module.exports = {
    sendForm
} 
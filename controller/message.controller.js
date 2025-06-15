const errorHandler = require('../utils/errorHandler')
const Message = require('../models/message.schema')
const httpResponse = require('../utils/httpResponse')
const asyncWrapper = require('../middlewares/asyncWrapper')


const sendForm = asyncWrapper(async(req,res, next)=>{ 
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
    res.json({status:httpResponse.status.created , message: httpResponse.message.messageCreated, data:{newMessage}})
})


module.exports = {
    sendForm
}
const errorHandler = require('../utils/errorHandler')
const Message = require('../models/message.schema')
const httpStatus = require('../utils/httpResponse')
const asyncWrapper = require('../middlewares/asyncWrapper')

const sendForm = asyncWrapper(async(req,res, next)=>{ //swilam
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
    res.json({status:201, message:httpStatus.status.success, data:{newMessage}})
})


module.exports = {
    sendForm
}
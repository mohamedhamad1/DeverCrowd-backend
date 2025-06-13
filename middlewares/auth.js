const jwt = require('jsonwebtoken')
const errorHandler = require('../middlewares/errorHandler')
const verifyToken = async(req, res, next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if(!authHeader){
        const error = errorHandler.create('token is required')
        next(error)
    }
    const token = authHeader
    const currentAdmin = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.currentAdmin = currentAdmin
    next()
}

module.exports = verifyToken
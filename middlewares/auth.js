const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if(!authHeader){
        next()
    }
    const token = authHeader
    const currentAdmin = jwt.verify(token, process.env.JWT_SECRET_KEY)
    next()
}

module.exports = verifyToken
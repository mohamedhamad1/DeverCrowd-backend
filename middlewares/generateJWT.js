const jwt = require('jsonwebtoken')
module.exports = async (pyload)=>{
    const token = await jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        {expiresIn: '1m'}
    )
    return token
}
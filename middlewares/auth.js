const jwt = require('jsonwebtoken')
const redis = require("../config/redis");
const errorHandler = require('../utils/errorHandler');
const httpResponse = require('../utils/httpResponse');
const asyncWrapper = require('./asyncWrapper');

const verifyToken = asyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return next(errorHandler.create(httpResponse.message.tokenRequired, httpResponse.status.badrequest))

  const isBlacklisted = await redis.get(`blacklist:${token}`);
  if (isBlacklisted)
    return next(errorHandler.create(httpResponse.message.tokenExpiredOrInvalid, httpResponse.status.unauthanticated))

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    return next(errorHandler.create(httpResponse.message.tokenExpiredOrInvalid, httpResponse.status.unauthanticated))
  }
});

const allowedTo = (...roles)=>{
  return(req, res, next)=>{
    if(!roles.includes(req.user.role)){
      return next(errorHandler.create(httpResponse.message.unauthorized, httpResponse.status.unauthorized))
    }
    next()
  }
}


module.exports = {
  verifyToken,
  allowedTo
}
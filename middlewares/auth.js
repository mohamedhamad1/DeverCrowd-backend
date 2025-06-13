const jwt = require('jsonwebtoken')
const redis = require("../config/redis");
const errorHandler = require('../utils/errorHandler');
const httpStatus = require('../utils/httpStatus');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "No token provided" });

  const isBlacklisted = await redis.get(`blacklist:${token}`);
  if (isBlacklisted) return res.status(401).json({ error: "Token is blacklisted" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.json({status:401, message:httpStatus.DATA.tokenExpiredOrInvalid, data:{}}); 
  }
};

module.exports = {
  verifyToken
}
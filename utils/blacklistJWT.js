const redis = require("../config/redis");

module.exports = async (token)=>{
    const expiresIn = 60 * 60;
    await redis.set(`blacklist:${token}`, "1", {
        EX: expiresIn,
        });
}


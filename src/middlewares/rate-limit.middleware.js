const { redisClient } = require("../utils/redis")
const asyncHandler = require('express-async-handler');
const { ApiResponse } = require("../utils/resposonses");


const rateLimitMiddleware = asyncHandler(async(req , res , next) => {

    const key = `req:ip:${req.ip}`

    const currReq = await redisClient.incr(key);
    console.log(currReq);
    
    if(currReq === 1){
        console.log('expiry set to ip');
        
        redisClient.expire(key , 15 * 60 ,'NX')
    }

    if(currReq > 10){
        res.status(429).json(new ApiResponse(
            false, 'Too many request made' 
        ))
    }
    
    next()

})

module.exports = rateLimitMiddleware;
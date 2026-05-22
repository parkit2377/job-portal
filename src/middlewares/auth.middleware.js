const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { UnAuthenticated } = require('../utils/resposonses');
const dotenv = require('dotenv').config();

const auth = asyncHandler(async(req , res , next) => {
    const header = req.headers.authorization || req.headers.Authorization;

    if(!header || !header.startsWith('Bearer'))throw new UnAuthenticated('User not authenticated');


    const token = header.split(' ')[1];

    jwt.verify(token , process.env.API_KEY , (err , decode) => {
        if(err)throw new UnAuthenticated("You are Not Authorized");
        
        
        req.user = decode;
        next();
    })


})

module.exports = auth
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { UnAuthenticated } = require('../utils/resposonses');
const dotenv = require('dotenv').config();

const auth = asyncHandler(async(req , res , next) => {
    const header = req.headers.authorization || req.headers.Authorization;

    if(!header || !header.startsWith('Bearer'))throw new UnAuthenticated('User not authenticated');


    const token = header.split(' ')[1];

    try {
        jwt.verify(token , process.env.API_KEY );
        req.user = decode;
        next();
    } catch (error) {
        throw new UnAuthenticated('You are not authorized');
    }
    


})

module.exports = auth
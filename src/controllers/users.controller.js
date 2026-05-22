const asyncHandler = require('express-async-handler');
const userModel = require('../models/user.model');
const userService = require('../services/users.service');
const { ApiResponse } = require('../utils/resposonses');

const registerUser = asyncHandler(async(req , res) => {
    // console.log(req.validatedData);
    const user = await userService.registerUser(req.validatedData);

    res.json(new ApiResponse(true , "User Created Successfully" , user))
    
})


const loginUser = asyncHandler(async(req , res) => {
    const user = await userService.login(req.body , req.validatedData);


    res.json(new ApiResponse(true , "User Logged In Successfully" , user));
    
})





module.exports = { registerUser , loginUser }
const userModel = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BadRequest, NotFound, UnAuthenticated } = require("../utils/resposonses");
const candidateModel = require("../models/candidate.model");
const recuiterModel = require("../models/recuiter.model");
const { redisClient } = require('../utils/redis');

//register user 
const registerUser = async(validatedBody) => {

    const hashedPassword = await bcrypt.hash(validatedBody.password , 10);
    validatedBody.password = hashedPassword;
    
    const user = await userModel.create(validatedBody);
    if(!user)throw new BadRequest();

    return user
}


const login = async(validatedBody) => {
    const user = await userModel.findOne({email : validatedBody.email});
    
    if(!user)throw new UnAuthenticated("Please enter valid username and password");


    const verifyPassword = await bcrypt.compare(validatedBody.password , user.password);

    if(!verifyPassword)throw new UnAuthenticated("Please enter valid username and password");

    const [candidate , recruiter] = await Promise.all([
        candidateModel.findOne({userId : user?._id}).select('_id'),
        recuiterModel.findOne({userId : user._id}).select('_id')
    ]);
    

    const payload = {
        // name : user.name,
        email : user.email,
        role : user.role,
        // mobileNo : user.mobileNo,
        // dob : user.dob,
        candidateId : candidate?._id || null,
        recruiterId : recruiter?._id || null,
        userId : user._id
        
    }

    const token = jwt.sign(payload , process.env.API_KEY , {expiresIn : '1h'});
    const refreshToken = jwt.sign(payload , process.env.API_KEY , {expiresIn : '2d'});
    // redisClient.setEx(`refres:${refreshToken}` , 7 * 24 * 60 * 60 , JSON.stringify(user?._id));
    //cookies send will be here 
    
    
    //sending token

    return {
        token ,
        userId : user._id,
    }
}


module.exports = { registerUser , login }
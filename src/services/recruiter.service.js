const { default: mongoose } = require("mongoose");
const jobsModel = require("../models/jobs.model");
const recuiterModel = require("../models/recuiter.model");
const userModel = require("../models/user.model");
const { NotFound, BadRequest, InternalServerError } = require("../utils/resposonses");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


const becomeRecruiter = async(body , user) => {
    
    
    
    if(user.role == 'R')throw new BadRequest("User already a recruiter");



    const recruiter = await recuiterModel.create({
        companyName : body.companyName,
        companyDesc : body.companyDesc,
        companySize : body.companySize,
        userId : user.userId,
    });

    if(!recruiter)throw new BadRequest();


    const updatedUser  = await userModel.findByIdAndUpdate(user?.userId , {
        $set : {
            role : 'R'
        }
    } , {new : true , runValidators: true})

    const payload = {
        email: user.email,
        role: updatedUser.role,
        userId: user.userId,
    }


    const newToken = jwt.sign(payload , process.env.API_KEY , {expiresIn : '1h'});

    

    return {recruiter , newToken}
}



const updateRecruiter = async( body , user) => {
    const update = await recuiterModel.findOneAndUpdate({userId : user?.userId} , body , {
        returnDocument: 'after' , runValidators : true
    });
    //console.log(update);
    
    if(!update)throw new NotFound();

    return update

}

const deleteRecruiterService = async(params , user ) => {
    if(params?.recruiterId !== user?.recruiterId.toString())throw new BadRequest("Recruiter can only delete its own account");

    const [updateRecruiter , updatejobs] = await Promise.all([
        recuiterModel.findByIdAndUpdate(params.recruiterId , {
            $set : {isActive : false}
        } , {returnDocument : 'after'}),

        jobsModel.updateMany({recruiterId : params?.recruiterId , isActive : true},{
        $set : {isActive : false , isOpen : false}
    }),
    ])
    

    return updateRecruiter
    
}


module.exports = { becomeRecruiter , updateRecruiter , deleteRecruiterService }
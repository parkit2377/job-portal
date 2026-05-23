const { param } = require("../app");
const jobsModel = require("../models/jobs.model");
const recuiterModel = require("../models/recuiter.model");
const userModel = require("../models/user.model");
const { Forbidden, InternalServerError, NotFound } = require("../utils/resposonses");



const addJobService = async ( body , user ) => {
    // console.log(body);
    const recruiter = await recuiterModel.findOne({userId : user.userId}).select('userId').populate('userId' , 'role');
    
    if(!recruiter)throw new NotFound("Recruiter not found")
    
    if(recruiter?.userId?.role !== 'R')throw new Forbidden("Only recruiters can create jobs");
    // console.log({body , recruiterId : userRole?._id});
    
    const job = await jobsModel.create({...body , recruiterId : recruiter?._id , userId : user?.userId});

    return job
    
    
} 


const updateJob = async(body , user , params) => {
    const job = await jobsModel.findById({_id : params?.jobId}).select('userId');

    if(user.role !== 'R')throw new Forbidden();
    
    if(!job.userId.equals(user.userId))throw new Forbidden("Job can be update by the same user who posted");

    const update = await jobsModel.findByIdAndUpdate(params.jobId , {
        $set : {
            ...body
        }
    } , {returnDocument: 'after' , runValidators : true});
    
    return update
    
    
}



module.exports = { addJobService , updateJob }
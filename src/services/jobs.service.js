const { param } = require("../app");
const jobsModel = require("../models/jobs.model");
const recuiterModel = require("../models/recuiter.model");
const userModel = require("../models/user.model");
const logger = require("../utils/logger");
const { redisClient, getOrSet } = require("../utils/redis");
const { Forbidden, InternalServerError, NotFound, BadRequest } = require("../utils/resposonses");


const jobLogger = logger.child({
    service : 'job-service'
})


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
    logger.info("Job Details Update successfully")
    
    return update
    
    
}



const getJobs = async(body , user) => {
    let filter = {isActive : true};
    // filter.isActive = true;
    if(body?.location){
        filter.location = { $regex: body.location, $options: 'i' };
    }

    if(body?.keySkills && body?.keySkills.length){
        filter.keySkills = {$in : body.keySkills};
    }

    if(body?.salary?.min || body?.salary?.max){
        filter['salary.min'] = {};
        if(body?.salary?.min)
            filter['salary.min'].$gte = Number(body.salary.min);
        if(body?.salary?.max)
            filter['salary.min'].$lte = Number(body.salary.max)
    }

    if(body?.yearOfExp)
        filter['yearOfExp'] = body.yearOfExp;


    // console.log(filter);
    
    const jobs = await jobsModel.find(filter);
    // redisClient.get
    jobLogger.info('jobs fetched ');
    redisClient.setEx(`job:list` , 3000 , JSON.stringify(jobs) , )
    // for (let i = 0; i < 100; i++) {
    //     // const element = array[i];
    //     redisClient.setEx(`job:${i}` , 300 , `No : ${i}`)
        
    // }
    // redisClient.

    // redisClient.expire('test:1' , 300 , 'NX')    
    // let cursor = '0'
    // do{
    //     const res = await redisClient.scan(
    //         cursor , {"MATCH" : "job:*" , "COUNT" : 100}
    //     )
    //     const nextCursor = res.cursor;
    //     // console.log(res);
    //     // console.log(res.keys.length);
        
    //     cursor = nextCursor
    // }while (cursor!= '0')


    // logger.info('fetching job completed...')
    return jobs;
    
    
}


const getJobsRedis = async(body , user) => {
    return getOrSet(`job:${body?.location}` , 300 , async() => {


        let filter = {isActive : true};
    // filter.isActive = true;
    if(body?.location){
        filter.location = { $regex: body.location, $options: 'i' };
    }

    if(body?.keySkills && body?.keySkills.length){
        filter.keySkills = {$in : body.keySkills};
    }

    if(body?.salary?.min || body?.salary?.max){
        filter['salary.min'] = {};
        if(body?.salary?.min)
            filter['salary.min'].$gte = Number(body.salary.min);
        if(body?.salary?.max)
            filter['salary.min'].$lte = Number(body.salary.max)
    }

    if(body?.yearOfExp)
        filter['yearOfExp'] = body.yearOfExp;

    

        const jobs = await jobsModel.find(filter);

        return jobs
    })
}



const removeJobService = async(params , user) => {
    // console.log(params);
    const job = await jobsModel.findById(params?.jobId).select('recruiterId isActive');
    
    if(!job?.isActive)throw new BadRequest("Job already removed/inactive");

    if(!job?.recruiterId?.equals(user?.recruiterId))throw new Forbidden("Only job recuiter can delete the job");
    
    job.isActive = false;

    await job.save();

    return job;
    
}


const closeJobApplicationService = async(params , user) => {
    const job = await jobsModel.findById(params?.jobId).select('recruiterId isOpen');

    if(!job)throw new NotFound("job not found");
    if(job && !job?.isOpen)throw new BadRequest("Job already not accepting applications");

    if(!job?.recruiterId.equals(user?.recruiterId))throw new Forbidden("only job recruiter can close new applications");

    job.isOpen = false;

    await job.save();
    
    return job

}



module.exports = { addJobService , updateJob , getJobs , removeJobService , closeJobApplicationService , getJobsRedis }
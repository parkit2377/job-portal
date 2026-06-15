const asyncHandler = require('express-async-handler');
const jobsService = require('../services/jobs.service');
const { ApiResponse } = require('../utils/resposonses');


const addJob = asyncHandler( async ( req , res ) => {
    const job = await jobsService.addJobService(req.body , req.user);


    res.status(201).json(
        new ApiResponse(true , "Job created successfully" , job)
    )
})


const updateJob = asyncHandler(async(req , res) => {
    const update = await jobsService.updateJob(req.body , req.user , req.params);


    res.status(200).json(new ApiResponse(true , "Job Info Updated successfully") , update)
})


const removeJob = asyncHandler(async(req , res) => {
    const removed = await jobsService.removeJobService(req.validatedquery , req.user);
    
    res.status(200).json(
        new ApiResponse(true , "Job Removed Successfully" , removed)
    )
})



const getJobs = asyncHandler(async(req , res) => {
    const jobs = await jobsService.getJobs(req.validatedData , req.user);

    res.status(200).json(
        new ApiResponse(true , "Jobs fetched successfully" , jobs)
    );
})


const getJobsRedis = asyncHandler(async(req , res) => {
    const jobs = await jobsService.getJobsRedis(req.validatedData , req.user);

    res.status(200).json(
        new ApiResponse(true , "Jobs fetched successfully" , jobs)
    );
})


const closeJobApplication = asyncHandler(async(req , res) => {
    const closed = await jobsService.closeJobApplicationService(req.validatedquery , req.user);


    res.status(200).json(
        new ApiResponse(true , "closed job application" , closed)
    );
})


module.exports = { addJob , updateJob , getJobs , removeJob , closeJobApplication , getJobsRedis };
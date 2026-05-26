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
    const removed = await jobsService.removeJob(req.params) 
})


module.exports = { addJob , updateJob };
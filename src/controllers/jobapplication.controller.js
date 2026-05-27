const asyncHandler = require('express-async-handler');
const jobApplicationService = require('../services/jobapplication.service');
const { ApiResponse } = require('../utils/resposonses');

const applyJob = asyncHandler(async(req , res) => {
    const application = await jobApplicationService.jobApplicationService(req.validatedData , req.user);


    res.status(201).json(
        new ApiResponse(true , "Job applied successfully" , application)
    );
})



const changeJobApplicationStatus = asyncHandler ( async ( req , res ) =>{
   const updateStatus = await jobApplicationService.changeJobApplicationStatus(req.validatedData , req.user);

    res.status(200).json(
        new ApiResponse(true , "Job Application Status Changed Successfully" , updateStatus)
    );
});




const getJobApplications = asyncHandler(async(req , res) => {
    const applications = await jobApplicationService.getJobApplications(req.validatedData , req.user);

    res.status(200).json(
        new ApiResponse(true , "job applications fetched successfully" , applications)
    );
})



const getCandidateAllApplication = asyncHandler(async(req , res) => {
    const application = await jobApplicationService.getCandidateAllApplicationService(req.user);

    res.status(200).json(
        new ApiResponse(true , "Job application fetched successfully" , application)
    );
})



module.exports = { applyJob , getCandidateAllApplication , getJobApplications , getJobApplications , changeJobApplicationStatus };
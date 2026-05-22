const asyncHandler = require('express-async-handler');
const recruiterService = require('../services/recruiter.service');
const { ApiResponse } = require('../utils/resposonses');

    const becomeRecruiter = asyncHandler(async(req , res) => {
        const recruiter = await recruiterService.becomeRecruiter(req.validatedData , req.user);


        res.status(201).json(new ApiResponse(true , "Registered as recruiter successfully" , recruiter))
    })


    const updateRecruiter = asyncHandler(async(req , res) => {
        const newRecruiter = await recruiterService.updateRecruiter(req.validatedData , req.user);


        res.status(200).json(
            new ApiResponse(true , "Recruiter details updated successfully" , newRecruiter)
        )
    })


    const deleteRecruiter = asyncHandler(async(req , res) => {
        const deleted = await recruiterService.deleteRecruiter()
    })


module.exports = { becomeRecruiter , updateRecruiter }
const asyncHandler = require('express-async-handler');
const candidateService = require('../services/candidate.service');
const { ApiResponse } = require('../utils/resposonses');

const addCandidate = asyncHandler(async(req , res) => {
    const candidate = await candidateService.addCandidateService(req.validatedData , req.user , req.file);


    res.status(201).json(
        new ApiResponse(true , "Candidate profile created successfully" , candidate)
    )
})


const getCandidateProfile = asyncHandler(async(req , res) => {
    const candidate = await candidateService.getCandidateProfileService(req.user);

    res.status(200).json(
        new ApiResponse(true , "Candidate Details Fetch Successfully" , candidate)
    );
})


const updateCandidate = asyncHandler(async(req , res) => {
    const updated = await candidateService.updateCandidateService(req.validatedData , req.user , req.file);

    res.status(200).json(
        new ApiResponse(true , "Candidate updated successfully" , updated)
    )
})


module.exports = { addCandidate , getCandidateProfile , updateCandidate };
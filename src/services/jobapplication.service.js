const jobAppliesModel = require("../models/jobApplies.model");
const jobsModel = require("../models/jobs.model");
const { BadRequest, NotFound, ConflictError, Forbidden } = require("../utils/resposonses")




const jobApplicationService = async(body , user) => {
    // const application = await jobAppliesModel.create(body)

    if(!user?.candidateId)throw new BadRequest("Candidate profile must be complete to apply for job");


    const [job , applied] = await Promise.all([
         jobsModel.exists({_id : body?.jobId , isActive : true , isOpen : true}),
         jobAppliesModel.exists({candidateId : user?.candidateId , jobId : body?.jobId})
    ]) 
    

    if(!job)throw new NotFound("Job not found or not taking applications");

    if(applied)throw new ConflictError("Already Applied")


    const application = await jobAppliesModel.create({
        ...body , candidateId : user?.candidateId
    })

    return application
    
    
}


const getJobApplications = async(params , user , query) => {
    //console.log(params);
    //console.log(query);
    
    const job = await jobsModel.findById({_id : params?.jobId}).select('recruiterId');

    if(!job?.recruiterId.equals(user.recruiterId))throw new Forbidden("Only Job recruiter can see job applications");

    const applications = await jobAppliesModel.find({jobId : params?.jobId}).populate('candidateId' , 'resume profileSummary skills').limit(query?.limit || 10).skip((query.page - 1)  * query.limit);
    //console.log(applications.map(i => i._id));
    return applications
    
}



const changeJobApplicationStatus = async(body , user) => {

    const jobApplication = await jobAppliesModel.findById({_id : body?.jobApplicationId}).populate('jobId' , 'recruiterId status');

    if(!jobApplication?.jobId?.recruiterId.equals(user.recruiterId))throw new Forbidden("Only Job recruiter can change job applications status");

    jobApplication.status = body?.status;

    await jobApplication.save();

    return jobApplication;

}



const getCandidateAllApplicationService = async(user) => {
    const applications = await jobAppliesModel.find({candidateId : user?.candidateId}).limit(10).sort({createdAt : -1}).populate('jobId' , 'title description requirments keySkills');

    //console.log(applications);
    return applications;
    
}


module.exports = { jobApplicationService , changeJobApplicationStatus , getCandidateAllApplicationService , getJobApplications }
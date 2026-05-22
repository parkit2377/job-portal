const mongoose = require('mongoose');

const jobApplySchema = mongoose.Schema({
    jobId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Job",
        required : [true , "jobid is required"]
    },
    candidateId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Candidate",
        required : [true , "candidate id is required"]
    },
    status : {
        type    : String,
        enum    : ['pending', 'reviewed', 'accepted', 'rejected'],
        default : 'pending'
    },
    noticePeriod : {
        type : String,
        enum : ['immediate', '15days', '30days', '60days', '90days']
    },
    currentOrganization : {
        type : String,
        default : null    
    },
    yearOfExp : {
        type : String,
        enum : ['0-1' , '1-2' , '2-5' , '5-8' , '8+'],
        required : [true , "candidate year of experience is required"]
    },
    isWithdrawn : {
        type    : Boolean,
        default : false    
    }


}, { timestamps : true})

module.exports = mongoose.model("Jobapplication" , jobApplySchema);
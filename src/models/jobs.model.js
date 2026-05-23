const mongoose = require('mongoose');


const jobSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true , "job title is required"]
    },
    description : {
        type : String,
        required : [true , "job description is required"],
        
    },
    salary : {
        min : { type: Number, required: true },
        max : { type: Number, required: true },
        currency : { type: String, default: 'INR' }
    },
    requirments : {
        type : [String],
        required : [true , "job requirements are required"]
    },
    keySkills : {
        type : [String],
        required : [true , 'key skills are required']
    },
    yearOfExp : {
        type : String,
        enum : ['0-1' , '1-3' , '3-5' , '5-8' , '8+']
    },
    location : {
        type : String,
        required : [true , 'job location is required']
    },
    jobRole : {
        type : String,
        required : [true , 'job role is required']
    },
    recruiterId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Recruiter",
        required : [true , "recruiter is required"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , "userId is required"]
    },
    isActive : {
        type : Boolean,
        default : true
    },
    deletedOn : {
        type : Date,
        default : null
    }
    
} , {timestamps : true} )

module.exports = mongoose.model("Job" , jobSchema);
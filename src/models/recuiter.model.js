const mongoose = require('mongoose');

const recruiterSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true , "user id is required"]
    },
    companyName : {
        type : String,
        required : [true , "company name is required"]
    },
    website : {
        type : String,
        default : null
    },
    logo : {
        type : String,
        default : null
    },
    companyDesc : {
        type : String,
        required : [true , "company description is required"]
    },
    companySize : {
        type : String,
        enum: [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "500-1000",
        "1000+"
    ],
    required : [true , "company size is required"]
    },
    isActive : {
        type : Boolean,
        default : true
    },
    deletedOn : {
        type : Date ,
        default : null
    }

})

recruiterSchema.index(
    { userId: 1 },
    { unique: true }
);


module.exports = mongoose.model("Recruiter" , recruiterSchema);
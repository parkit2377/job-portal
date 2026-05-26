const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
    userId : {
        type     : mongoose.Schema.Types.ObjectId,
        ref      : 'User',
        required : true
    },
    resume         : { 
        type: String, 
        default: null , 
        required : [true , "Resume is required to ceraete candidate profile"] },  // file path/url

    profileSummary : { 
        type: String, 
        default: null },
        
    skills : { 
        type: [String], 
        default: []  },
        
}, { timestamps: true });

candidateSchema.index({ userId: 1 }, { unique: true });


module.exports = mongoose.model("Candidate" , candidateSchema);
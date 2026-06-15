const fs = require("fs");
const { addCandidateValidator } = require("../validators/candidate.validator");
const { BadRequest, ConflictError, NotFound } = require("../utils/resposonses");
const candidateModel = require("../models/candidate.model");
const { saveResume } = require("../utils/utils");
const path = require('path');
const logger = require("../utils/logger");


const candidateLogger = logger.child({
  service : "candidate"
})

const addCandidateService = async (body, user, file) => {
  const candidateExist = await candidateModel.exists({ userId: user?.userId });
  if (candidateExist) {
    fs.unlink(file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    throw new ConflictError();
  }

  const filepath = saveResume(file); // get saved file path to store in db

  const candidate = await candidateModel.create({
    resume: filepath,
    profileSummary: body?.profileSummary,
    skills: body?.skills,
    userId: user?.userId,
  });
  candidateLogger.info("Candidate Added " + candidate?._id);

  return candidate;
};

const getCandidateProfileService = async (user) => {
  const candidate = await candidateModel
    .findOne({ userId: user?.userId })
    .populate({
      path: "userId",
      match: {"isActive" : true},
      select: "name email mobileNo role dob createdAt",
    })
  //console.log(candidate);
  if(!candidate) throw new NotFound("Candidate profile not found");
  return candidate
};




const updateCandidateService = async(body , user , file) => {
    const candidate = await candidateModel.findOne({userId : user.userId}).select('resume ');
    
    if(!candidate)throw new NotFound("Candidate not found");
    let filePath;
    if(file){
        if(candidate.resume){
            try {
                const rootDir = process.cwd();
                const oldPath = path.join(rootDir, candidate.resume);
                
                if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            } catch(err) {
                console.error('Could not delete old resume:', err.message);
            }
        }
        filePath = saveResume(file);
    }

    const update = await candidateModel.updateOne({userId : user.userId} , {
        $set : {
            ...body, ...( filePath && {resume : filePath})
        }
    } , {returnDocument: 'after' })

    return update
}


module.exports = { addCandidateService, getCandidateProfileService , updateCandidateService };

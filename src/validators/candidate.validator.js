const { z } = require("zod");

const addCandidateValidator = z.object({
  profileSummary: z
    .string()
    .min(10, "Profile Summary too short")
    .max(200, "profile summary must be 200 character")
    .optional(),

  skills: z.preprocess(val => JSON.parse(val) , z.array(z.string())
    .min(1, "Atleast one skill is required")
    .optional())
    ,
});


const updateCandidateValidator = addCandidateValidator.partial();


module.exports = { addCandidateValidator , updateCandidateValidator };
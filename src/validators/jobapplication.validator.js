const { z } = require("zod");
const { objectIdSchemaValidation } = require("../utils/utils");

const addJobApplicationValidator = z.object({
  jobId: objectIdSchemaValidation,
//   candidateId: objectIdSchemaValidation,
  status: z.enum(["pending", "reviewed", "accepted", "rejected"]).optional(),
  noticePeriod: z.enum(["immediate", "15", "30", "60", "90"]),  
  currentOrganization: z
    .string()
    .trim()
    .min(3, "Organization Name too short")
    .max(50, "Organization Name too Long"),
  yearOfExp: z.enum(["0-1", "1-2", "2-5", "5-8", "8+"]),
});


const applicationStatusUpdateValidator = z.object({
    jobApplicationId : objectIdSchemaValidation,
    status : z.enum([ "reviewed", "accepted", "rejected"])
})

module.exports = { addJobApplicationValidator , applicationStatusUpdateValidator };
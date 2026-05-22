const { z, object } = require("zod");
const { objectIdSchemaValidation } = require("../utils/utils");
// const { objectIdSchemaValidation } = require("../utils/utils");

const becomeRecruiterValidator = z.object({
  companyName: z
    .string()
    .trim()
    .min(3, "company name too must be atleast 3 character")
    .max(50, "company name too long"),

  companyDesc : 
    z.string().trim().min(20 , "Desriction must be atleast 20 character"),
  
  companySize : z.string(),
  
  
//   userId :  objectIdSchemaValidation
});


const updateRecruiterQueryValidator = z.object({
    recruiterId : objectIdSchemaValidation
})

const updateRecruiterBodyValidator = becomeRecruiterValidator.partial().refine(d => !Object.keys(d).length == 0,{message : "Atleast one field is required to update"} )



module.exports = { becomeRecruiterValidator , updateRecruiterBodyValidator , updateRecruiterQueryValidator }

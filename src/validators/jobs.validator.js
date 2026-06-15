const { z } = require("zod");
const { objectIdSchemaValidation } = require("../utils/utils");

const addJobValidator = z.object({
  title: z
    .string()
    .trim()
    .min(3, "title must be at least 3 character")
    .max(50, "job title too long"),

  description: z
    .string()
    .trim()
    .min(20, "job description must be atleast 20 characters"),

  salary: z.object({
    min: z.number(),
    max: z.number(),
  }),

  requirments: z
    .array(z.string().min(2))
    .min(1, "Atleast one requirement is required"),

  keySkills: z.array(z.string(2)).min(1, "Atleast one requirement is required"),

  yearOfExp: z.enum(["0-1", "1-2", "2-5", "5-8", "8+"]),

  location: z.string().min(2, "location name too short"),

  jobRole: z.string().min(3, "job role name too short"),

//   recruiterId: objectIdSchemaValidation,
});


const updateJobValidator = addJobValidator.partial();


const updateJobParamValidation = z.object({
    jobId : objectIdSchemaValidation
})


const getJobsValidator = z.object({
    location : z.string().toLowerCase()
                .trim().optional(),
    salary : z.object({
        max : z.number().nullable().optional(),
        min : z.number().nullable().optional(),
    }).optional(),
    yearOfExp :   z.enum(["0-1", "1-2", "2-5", "5-8", "8+"]).optional(),
    keySkills: z.array(z.string(2)).min(1, "Atleast one requirement is required").optional(),          
}).optional();


const removeJobValidator = z.object({
    jobId : objectIdSchemaValidation
}) 


const closeJobApplicationValidator = z.object({
    jobId : objectIdSchemaValidation
}) 


module.exports = { closeJobApplicationValidator , addJobValidator , updateJobValidator , removeJobValidator , updateJobParamValidation , getJobsValidator };

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

  yearOfExp: z.enum(["0-1", "1-3", "3-5", "5-8", "8+"]),

  location: z.string().min(2, "location name too short"),

  jobRole: z.string().min(3, "job role name too short"),

//   recruiterId: objectIdSchemaValidation,
});


const updateJobValidator = addJobValidator.partial();


const updateJobParamValidation = z.object({
    jobId : objectIdSchemaValidation
})


module.exports = { addJobValidator , updateJobValidator , updateJobParamValidation };

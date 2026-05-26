const { z } = require('zod');
const { objectIdSchemaValidation } = require('../utils/utils');

const addJobApplicationValidator = z.object({

    jobId : objectIdSchemaValidation,
    candidateId : objectIdSchemaValidation,
    status : z.enum(['pending', 'reviewed', 'accepted', 'rejected']),
    noticePeriod : z.enum['immediate', '15days', '30days', '60days', '90days'],
    currentOrganization : z.string().min(3 , "Organization Name too short").max(50 , "Organization Name too Long"),
    yearOfExp : z.enum(['0-1' , '1-2' , '2-5' , '5-8' , '8+'])
})




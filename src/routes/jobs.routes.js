const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { dataValidator, paramsValidator } = require('../middlewares/validator.middleware');
const { addJobValidator, updateJobValidator , closeJobApplicationValidator , updateJobParamValidation, getJobsValidator , removeJobValidator } = require('../validators/jobs.validator');
const { addJob, updateJob, getJobs, removeJob, closeJobApplication } = require('../controllers/jobs.controller');
const router = express.Router();


router.use(auth);
router.post('/add-job' , dataValidator(addJobValidator) , addJob);
router.patch('/update-job/:jobId' , paramsValidator(updateJobParamValidation) , dataValidator(updateJobValidator) , updateJob);
router.post('/get-jobs' , dataValidator(getJobsValidator) , getJobs);
router.delete('/delete/:jobId' , paramsValidator(removeJobValidator) , removeJob);
router.patch('/close-job-application/:jobId' , paramsValidator(closeJobApplicationValidator) , closeJobApplication);

module.exports = router;
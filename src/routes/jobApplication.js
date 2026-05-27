const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { applyJob, getJobApplications, changeJobApplicationStatus, getCandidateAllApplication } = require('../controllers/jobapplication.controller');
const { dataValidator } = require('../middlewares/validator.middleware');
const { addJobApplicationValidator, applicationStatusUpdateValidator } = require('../validators/jobapplication.validator');

const router = express.Router();


router.use(auth);

router.post('/apply-job' , dataValidator(addJobApplicationValidator) , applyJob);
router.get('/jobs/:jobId' , getJobApplications);
router.patch('/update-status' , dataValidator(applicationStatusUpdateValidator) , changeJobApplicationStatus)
router.get('/applications' , getCandidateAllApplication);


module.exports = router;
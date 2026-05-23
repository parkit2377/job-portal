const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { dataValidator, paramsValidator } = require('../middlewares/validator.middleware');
const { addJobValidator, updateJobValidator, updateJobParamValidation } = require('../validators/jobs.validator');
const { addJob, updateJob } = require('../controllers/jobs.controller');
const router = express.Router();


router.use(auth);
router.post('/add-job' , dataValidator(addJobValidator) , addJob);
router.patch('/update-job/:jobId' , paramsValidator(updateJobParamValidation) , dataValidator(updateJobValidator) , updateJob);


module.exports = router;
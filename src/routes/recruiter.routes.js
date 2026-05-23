const express = require('express');
const {dataValidator , paramsValidator } = require('../middlewares/validator.middleware');
const { becomeRecruiterValidator , updateRecruiterBodyValidator } = require('../validators/recruiter.validator');
const auth = require('../middlewares/auth.middleware');
const { becomeRecruiter, updateRecruiter } = require('../controllers/recruiter.controller');
const router = express.Router();


router.use(auth);
router.post('/become-recruiter' , dataValidator(becomeRecruiterValidator) , becomeRecruiter);
router.patch('/update-recruiter' , dataValidator(updateRecruiterBodyValidator) , updateRecruiter);

module.exports = router;
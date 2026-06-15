const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { dataValidator , dataValidatorWithFile } = require('../middlewares/validator.middleware');
const multer = require('multer');
const { addCandidateValidator, updateCandidateValidator } = require('../validators/candidate.validator');
const { addCandidate, getCandidateProfile, updateCandidate } = require('../controllers/candidate.controller');
const router = express.Router();
const upload = multer({dest : 'uploads/candidate/resume' , limits : {fileSize : 5 * 1024 * 1024}})

router.use(auth);

router.post('/add-candidate' , upload.single('file') , dataValidatorWithFile(addCandidateValidator) , addCandidate);
router.get('/profile' , getCandidateProfile);
router.patch('/update' , upload.single('file') , dataValidator(updateCandidateValidator) , updateCandidate );

module.exports = router;
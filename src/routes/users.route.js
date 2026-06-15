const express = require('express');
const { registerValidator, loginValidator } = require('../validators/users.validators');
const { registerUser, loginUser } = require('../controllers/users.controller');
const router = express.Router();
const { dataValidator } = require('../middlewares/validator.middleware')

router.post('/register' , dataValidator(registerValidator) , registerUser)
router.post('/login' , dataValidator(loginValidator) , loginUser)

module.exports = router;

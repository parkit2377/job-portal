const { z } = require('zod');
const mongoose = require('mongoose');

const objectIdSchemaValidation = z.string().refine(val => mongoose.Types.ObjectId.isValid(val) , 'object id is incorrect');



module.exports = {objectIdSchemaValidation};
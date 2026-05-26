const { z } = require('zod');
const mongoose = require('mongoose');
const path = require("path");
const fs = require('fs')

const objectIdSchemaValidation = z.string().refine(val => mongoose.Types.ObjectId.isValid(val) , 'object id is incorrect');




const saveResume = (file) => {
    const oldPath = file.path;
    const newFilename = 'job_portal' + new Date().getTime() + path.extname(file.originalname);
    // console.log(newFilename);
    
    const newPath = path.join('uploads/candidate/resume', newFilename);
    fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;})
    
    return newPath
}


module.exports = {objectIdSchemaValidation , saveResume };
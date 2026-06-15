const { z } = require('zod');
const mongoose = require('mongoose');
const path = require("path");
const fs = require('fs');
const winston = require('winston');


const { combine, timestamp, printf } = winston.format;





const objectIdSchemaValidation = z.string().refine(val => mongoose.Types.ObjectId.isValid(val) , 'object id is incorrect');




const saveResume = (file) => {
    const oldPath = file.path;
    const newFilename = 'job_portal' + new Date().getTime() + path.extname(file.originalname);
    // //console.log(newFilename);
    
    const newPath = path.join('uploads/candidate/resume', newFilename);
    fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;})
    
    return newPath
}


const customLoggerFormat = printf(
    ({level , message , timestamp , stack , service}) => {
        return `[${timestamp}] [${service ? service : ''}] ${level.toUpperCase()} : ${stack || message}`
    }
)


module.exports = {objectIdSchemaValidation , saveResume , customLoggerFormat };
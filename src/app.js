const express = require('express');
const connectDb = require('./utils/db');
const errorHandler = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');



const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined' , {
    stream : {
        write : (msg) => logger.info(msg.trim())
    }
}))
//routes used
app.use('/api/v1/users' , require('./routes/users.route'));
app.use('/api/v1/recruiter' , require('./routes/recruiter.routes'));
app.use('/api/v1/jobs' , require('./routes/jobs.routes'));
app.use('/api/v1/candidate' , require('./routes/candidate.routes'));
app.use('/api/v1/jobApplication' , require('./routes/jobApplication'));

app.use(errorHandler);


//db connection
connectDb();




module.exports = app
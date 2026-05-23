const express = require('express');
const connectDb = require('./utils/db');
const errorHandler = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser');



const app = express();

app.use(express.json());
app.use(cookieParser());

//routes used
app.use('/api/v1/users' , require('./routes/users.route'));
app.use('/api/v1/recruiter' , require('./routes/recruiter.routes'));
app.use('/api/v1/jobs' , require('./routes/jobs.routes'));

app.use(errorHandler);


//db connection
connectDb();




module.exports = app
const express = require('express');
const connectDb = require('./utils/db');
const errorHandler = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('mongo-sanitize');
const rateLimit = require('express-rate-limit');
const { connectRedis, redisClient } = require('./utils/redis');
const rateLimitMiddleware = require('./middlewares/rate-limit.middleware');

const app = express();

app.use(helmet({
    contentSecurityPolicy : false
}))

app.use(cors({origin : 'http://localhost:55555' , credentials : true}))
app.use(express.json({limit : '20kb'}));
app.use(hpp())
app.use(cookieParser());
// app.use(mongoSanitize({replaceWith : '_' , allowDots : false}));

app.use((req , res , next) => {
    if(req.body) req.body = mongoSanitize(req.body);
    if(req.params)req.params = mongoSanitize(req.params)
    
    next()
})


app.use(morgan('combined' , {
    stream : {
        write : (msg) => logger.info(msg.trim())
    }
}))

app.use('/api' , rateLimit({
  windowMs : 15 *60 * 1000,
  message : {status : false, message : 'Too many requests made'},
  max : 10
}))

app.use(rateLimitMiddleware);
// app.use('/api' ,rateLimit({
//   windowMs : 15 *60 * 1000,
//   message : {status : false, message : 'Too many requests made'},
//   max : 10
// })
// )


//routes used
app.use('/api/v1/users' , require('./routes/users.route'));
app.use('/api/v1/recruiter' , require('./routes/recruiter.routes'));
app.use('/api/v1/jobs' , require('./routes/jobs.routes'));
app.use('/api/v1/candidate' , require('./routes/candidate.routes'));
app.use('/api/v1/jobApplication' , require('./routes/jobApplication'));

app.use(errorHandler);


//db connection
connectDb();
connectRedis();




module.exports = app
const winston = require('winston');
const { customLoggerFormat } = require('./utils');
require('dotenv').config();

const logger = winston.createLogger({
    transports : [
        // new winston.transports.Console(),
        new winston.transports.File({
            filename : './logs/logs.error.log',
            level : 'error'
        }),
        new winston.transports.File({
            filename : './logs/logs.log'
        })
    ],
    // level : process.env.NODE_ENV == 'development' ? 'error' :  'info',
    format : winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.errors({
            stack : true
        }),
        // winston.format.simple()
        customLoggerFormat
    ),

    exceptionHandlers: [
        new winston.transports.File({
            filename: "./logs/exceptions.log"
        })
    ],

    rejectionHandlers: [
  new winston.transports.File({
    filename: "./logs/rejections.log"
  })
]
})








module.exports = logger;
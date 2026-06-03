const logger = require("../utils/logger");




const errorHandler = (err , req , res , next) => {
    const status = err.statusCode || 500;
    logger.info(err.message,{
        status : err.statusCode,
        ... (process.env.NODE_ENV == 'development' && {stackTrace : err.stack})
    })
    res.status(status).json({
        status : false,
        message : err.message,
        ... (process.env.NODE_ENV == 'development' && {stackTrace : err.stack})
    })
}

module.exports = errorHandler




const errorHandler = (err , req , res , next) => {
    const status = err.statusCode || 500;

    res.status(status).json({
        status : false,
        message : err.message,
        ... (process.env.NODE_ENV == 'development' && {stackTrace : err.stack})
    })
}

module.exports = errorHandler
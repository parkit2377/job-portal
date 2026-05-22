const { BadRequest } = require("../utils/resposonses");


const dataValidator = (schema) => {
    return (req , res , next) => {
        const validatedData = schema.safeParse(req.body);
        
        if(!validatedData?.success)return res.status(400).json({
            status : false,
            errors: validatedData.error.flatten()
        })
        req.validatedData = validatedData.data;
        next();
    }
}


const queryValidator = (schema) => {
    return (req , res , next) => {
        const validatedData = schema.safeParse(req.query);
        
        if(!validatedData?.success)return res.status(400).json({
            status : false,
            errors: validatedData.error.flatten()
        })
        req.validatedquery = validatedData.data;
        next();
    }
}

module.exports = { dataValidator , queryValidator }
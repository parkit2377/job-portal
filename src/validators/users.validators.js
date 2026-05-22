const { z } = require('zod');

const registerValidator = z.object({
    name : z.string()
            .trim()
            .min(2 , "Name must be 2 character long")
            .max(20 , "name is too long"),
            
    email : z.string()
             .trim()
             .toLowerCase()   
             .email("email id format is not valid"),

    password : z.string()
                .trim()
                .min(5 , "Password too short")
                .max(20 , "password too long"),

    mobileNo : z.string()
                .trim()
                .min(10 , "mobile no must be 10 digit long")
                .max(10 , "mobile no must be 10 digit long"),

    dob :       z.coerce.date(),
    // role : z.string()
})



const loginValidator = z.object({
    email : z.string()
             .trim()
             .toLowerCase()   
             .email("please enter a valid email address"),

    password : z.string()
                .trim()
               
})






module.exports = { registerValidator , loginValidator }
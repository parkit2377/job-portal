const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : [true , "Name is required"]
    },
    email : {
        type : String,
        required : [true , "email id is required"],
        unique : [true , "email id already registered"]
    },
    password : {
        type : String,
        required : [true , "password is required"]
    },
    mobileNo : {
        type : String,
        required : [true , "mobile no is required"],
        unique : [true , "mobile no already registered"]
    },
    role : {
        type : String,
        enum : ['R' , 'C'],
        required : [true , "role is required"],
        default : 'C'
    },
    dob : {
        type : Date,
        required : [true , "dob is required"]
    },
    isActive : {
        type : Boolean,
        default : true
    },
    deletedOn : {
        type : Date ,
        default : null
    }

},{timestamps : true})

module.exports = mongoose.model("User" , userSchema);
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDb = async() => {
    try{
        
        const connection = await mongoose.connect(process.env.DB_CONNECTION);
        console.log('db connected with ' , connection.connection.db.databaseName);
        
    }catch{
        console.log('error connection with db');
        process.exit(1);
        
    }
}    

module.exports = connectDb
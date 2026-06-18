const mongoose = require('mongoose');
const logger = require('./logger');
const dotenv = require('dotenv').config();

const dbLogger = logger.child({
    service : "db-service"
})

const connectDb = async() => {
    
    try{
        // console.log('trying db connection');
        
        
        const connection = await mongoose.connect(process.env.NODE_ENV='development' ? process.env.DB_CONNECTION :  process.env.DEPOLYDB);
        console.log('db connected with ' , connection.connection.db.databaseName);
        dbLogger.info('db connected with ' , connection.connection.db.databaseName);
    }catch{
        // console.log(process.env.DEPOLYDB);
        dbLogger.error("db not connected")
        // console.log('error connection with db');
        process.exit(1);
        
    }
}    

module.exports = connectDb
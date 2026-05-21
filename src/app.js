const express = require('express');
const connectDb = require('./utils/db');




const app = express();




connectDb();




module.exports = app
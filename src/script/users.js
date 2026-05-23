const mongoose = require('mongoose');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../../.env' });

const seed = async () => {
    // connect first
    console.log('mongodb://localhost:27017/job-portal');
    
    await mongoose.connect('mongodb://localhost:27017/job-portal');
    console.log('DB connected');

    const firstNames = [
    "Aarav", "Vivaan", "Aditya", "Arjun", "Krishna",
    "Ishaan", "Rohan", "Karan", "Rahul", "Ankit",
    "Priya", "Ananya", "Sneha", "Pooja", "Kavya",
    "Neha", "Riya", "Simran", "Meera", "Aisha"
];

const lastNames = [
    "Sharma", "Verma", "Gupta", "Mehta", "Yadav",
    "Singh", "Jain", "Agarwal", "Mishra", "Joshi"
];

    const users = [];

    for(let i = 1; i <= 500; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName  = lastNames[Math.floor(Math.random() * lastNames.length)];

        const hashedPassword = await bcrypt.hash(`Pass${i}@123`, 10);

        users.push({
            name     : `${firstName} ${lastName}`,
            email    : `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}@gmail.com`,
            password : hashedPassword,
            mobileNo : `9${String(i).padStart(9, '0')}`,
            dob      : `${Math.floor(Math.random() * 10) + 1990}-01-01`
        });
    }

    // insertMany — one DB call for all 500 users
    // instead of 500 separate create calls
    await userModel.insertMany(users);
    console.log('500 users seeded');

    await mongoose.disconnect();
};

seed().catch(console.error);
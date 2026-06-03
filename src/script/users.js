require('dotenv').config({ path: '../../.env' });


const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const { faker } = require('@faker-js/faker');
// import { faker } from '@faker-js/faker';

const userModel      = require('../models/user.model');
const recuiterModel  = require('../models/recuiter.model');
const candidateModel = require('../models/candidate.model');
const jobsModel      = require('../models/jobs.model');
const jobAppliesModel = require('../models/jobApplies.model');

const SKILLS = [
    'React', 'Node.js', 'MongoDB', 'Express',
    'Angular', 'TypeScript', 'Python', 'Java',
    'PostgreSQL', 'Redis', 'AWS', 'Docker'
];

const EXP_RANGES   = ["0-1", "1-2", "2-5", "5-8", "8+"];
const JOB_TYPES    = ['full-time', 'part-time', 'contract', 'internship'];
const COMPANY_SIZE = ['1-10', '11-50', '51-200', '201-500', '500-1000', '1000+'];
const NOTICE       = ['immediate', '15', '30', '60', '90'];
const STATUS       = ['pending', 'reviewed', 'accepted', 'rejected'];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomSkills = () => SKILLS
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 4) + 2);

const seed = async () => {
    console.log(process.env.DB_CONNECTION);
    
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log('DB connected');

    // Clear existing data
    await Promise.all([
        userModel.deleteMany({}),
        recuiterModel.deleteMany({}),
        candidateModel.deleteMany({}),
        jobsModel.deleteMany({}),
        jobAppliesModel.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // ── Step 1 — Create 150 users ──────────────────────────
    const hashedPassword = await bcrypt.hash('Password123@', 10);
    console.log(faker.name.fullName());
    
    const userData = Array.from({ length: 150 }, (_, i) => ({
        name     : faker.name.fullName(),
        email    : `user${i}${Date.now()}@test.com`,
        password : hashedPassword,
        mobileNo : `9${String(i).padStart(9, '0')}`,
        dob      : faker.date.birthdate({ min: 22, max: 45, mode: 'age' }),
        role     : i < 30 ? 'R' : 'C',  // first 30 are recruiters
        isActive : true
    }));

    const users = await userModel.insertMany(userData);
    console.log(`Created ${users.length} users`);

    const recruiterUsers = users.filter(u => u.role === 'R');
    const candidateUsers = users.filter(u => u.role === 'C');

    // ── Step 2 — Create recruiter profiles ────────────────
    const recruiterData = recruiterUsers.map(user => ({
        userId      : user._id,
        companyName : faker.company.name(),
        companyDesc : faker.company.catchPhrase(),
        companySize : randomFrom(COMPANY_SIZE),
        website     : faker.internet.url(),
        isActive    : true
    }));

    const recruiters = await recuiterModel.insertMany(recruiterData);
    console.log(`Created ${recruiters.length} recruiters`);

    // ── Step 3 — Create candidate profiles ────────────────
    const candidateData = candidateUsers.map(user => ({
        userId         : user._id,
        profileSummary : faker.lorem.sentences(2),
        skills         : randomSkills(),
        resume         : 'uploads/candidate/resume/sample.pdf',
    }));

    const candidates = await candidateModel.insertMany(candidateData);
    console.log(`Created ${candidates.length} candidates`);

    // ── Step 4 — Create 100 jobs ───────────────────────────
    const jobData = Array.from({ length: 100 }, (_, i) => {
        const recruiter = recruiters[i % recruiters.length];
        const minSalary = Math.floor(Math.random() * 15 + 5) * 10000;

        return {
            title       : faker.name.jobTitle(),
            description : faker.lorem.paragraphs(2),
            salary      : {
                min      : minSalary,
                max      : minSalary + 200000,
                currency : 'INR'
            },
            requirments : faker.lorem.sentences(3).split('. '),
            keySkills   : randomSkills(),
            yearOfExp   : randomFrom(EXP_RANGES),
            location    : randomFrom([
                'Bangalore', 'Mumbai', 'Delhi',
                'Hyderabad', 'Pune', 'Chennai', 'Jaipur'
            ]),
            jobRole     : faker.name.jobType(),
            jobType     : randomFrom(JOB_TYPES),
            recruiterId : recruiter._id,
            userId      : recruiter.userId,
            isActive    : true,
            isOpen      : true,
        };
    });

    const jobs = await jobsModel.insertMany(jobData);
    console.log(`Created ${jobs.length} jobs`);

    // ── Step 5 — Create 200 applications ──────────────────
    // track candidateId+jobId combinations to avoid duplicates
    const usedCombinations = new Set();
    const applicationData  = [];

    let attempts = 0;
    while(applicationData.length < 10000 && attempts < 20000) {
        attempts++;
        const candidate = candidates[Math.floor(Math.random() * candidates.length)];
        const job       = jobs[Math.floor(Math.random() * jobs.length)];
        const key       = `${candidate._id}-${job._id}`;

        if(usedCombinations.has(key)) continue;
        usedCombinations.add(key);

        applicationData.push({
            candidateId         : candidate._id,
            jobId               : job._id,
            status              : randomFrom(STATUS),
            noticePeriod        : randomFrom(NOTICE),
            currentOrganization : Math.random() > 0.3
                ? faker.company.name()
                : null,
            yearOfExp           : randomFrom(EXP_RANGES),
        });
    }

    await jobAppliesModel.insertMany(applicationData);
    console.log(`Created ${applicationData.length} applications`);

    console.log('\n✅ Seeding complete');
    console.log('Test credentials:');
    console.log('  Email    : user0<timestamp>@test.com');
    console.log('  Password : Password123@');

    await mongoose.disconnect();
};

seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
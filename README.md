# Job Portal API

REST API for a job portal with recruiter and candidate roles.

## Live API
https://job-portal-cefc.onrender.com/

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- Redis (Upstash)
- JWT Authentication
- Winston Logging
- Zod Validation

## Test Credentials
Candidate: candidate0@test.com / Password123@
Recruiter: recruiter0@test.com / Password123@

## Features
- Dual role system (Candidate/Recruiter)
- JWT auth with role-based access
- Job listings with filters and pagination
- Application management with status flow
- Redis caching for job listings
- Rate limiting on auth routes
- Structured logging with request IDs
- Soft delete with cascade

## API Endpoints
POST   /api/v1/users/register
POST   /api/v1/users/login
POST   /api/v1/jobs/get-jobs
POST   /api/v1/jobs/add-job
... etc

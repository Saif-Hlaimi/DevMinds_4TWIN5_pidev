const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const JobOffer = require('../models/JobOffer');
const User = require('../models/User');
const GestionRecruitementRoute = require('../Routes/GestionRecruitementRoute');

const app = express();
app.use(express.json());
app.use('/api/recruitment', GestionRecruitementRoute);

let server;

// ✅ Augmente le timeout Jest pour les opérations Mongo lentes
jest.setTimeout(15000);

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://127.0.0.1:27017/jobTestDB');
  }
  server = app.listen(4000);
});

afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if (server && server.close) {
      await new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
    }
  } catch (err) {
    console.error("Error during afterAll cleanup:", err);
  }
});

describe('Create Job Offer', () => {
  let userId;

  beforeEach(async () => {
    await User.deleteMany({});
    await JobOffer.deleteMany({});

    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: '123456',
      role: 'mentor'
    });

    await user.save();
    userId = user._id;
  });

  it('should create a new job offer', async () => {
    const newJob = {
      title: 'Développeur Web',
      description: 'Création de sites web modernes',
      experienceLevel: 'Beginner',
      jobType: 'Full-Time',
      location: 'Tunisia',
      city: 'Tunis',
      salaryRange: '1000-1500',
      postedBy: userId.toString()
    };

    const res = await request(app)
      .post('/api/recruitment/job-offers')
      .send(newJob);

    console.log(res.body); // Pour debug
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Développeur Web');
    expect(res.body.postedBy).toBe(userId.toString());
  });
});
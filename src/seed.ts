import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const seed = async () => {
  const connection = mongoose.createConnection(
    'mongodb+srv://turkeylearninginitiative:4usa1Wv0xhX5iW2y@turkeylearninginitiativ.qsikkag.mongodb.net/tli?retryWrites=true&w=majority',
  );

  const majorModel = connection.model(
    'UniversityMajor',
    new mongoose.Schema({ name: 'string', university: 'ObjectId' }),
  );

  const courseModel = connection.model(
    'Course',
    new mongoose.Schema({ name: 'string', universityMajor: 'ObjectId' }),
  );

  const universityModel = connection.model(
    'University',
    new mongoose.Schema({
      name: 'string',
      alphaTwoCode: 'string',
      country: 'string',
      domains: 'Array',
      webPages: 'Array',
    }),
  );

  const universities = await universityModel.find();

  for (let i = 0; i < 10; i++) {
    await majorModel.create({
      name: faker.random.word(),
      university:
        universities[Math.floor(Math.random() * universities.length)]._id,
    });
  }

  const majors = await majorModel.find();

  for (let i = 0; i < 50; i++) {
    await courseModel.create({
      name: faker.random.word(),
      universityMajor: majors[Math.floor(Math.random() * majors.length)]._id,
    });
  }

  process.exit();
};

seed();

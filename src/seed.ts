import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const seed = async () => {
  const connection = mongoose.createConnection(
    'mongodb+srv://turkeylearninginitiative:4usa1Wv0xhX5iW2y@turkeylearninginitiativ.qsikkag.mongodb.net/tli?retryWrites=true&w=majority',
  );

  const majorModel = connection.model(
    'UniversityMajor',
    new mongoose.Schema({ name: 'string' }),
  );

  const courseModel = connection.model(
    'Course',
    new mongoose.Schema({ name: 'string' }),
  );

  for (let i = 0; i < 10; i++) {
    await majorModel.create({
      name: faker.random.word(),
    });
  }

  for (let i = 0; i < 50; i++) {
    await courseModel.create({
      name: faker.random.word(),
    });
  }

  process.exit();
};

seed();

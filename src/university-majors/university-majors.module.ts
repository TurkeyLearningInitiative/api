import { Module } from '@nestjs/common';
import { UniversityMajorsService } from './university-majors.service';
import { UniversityMajorsController } from './university-majors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UniversityMajor,
  UniversityMajorSchema,
} from './entities/university-major.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UniversityMajor.name, schema: UniversityMajorSchema },
    ]),
  ],
  controllers: [UniversityMajorsController],
  providers: [UniversityMajorsService],
})
export class UniversityMajorsModule {}

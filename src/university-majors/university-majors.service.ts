import { Injectable } from '@nestjs/common';
import { CreateUniversityMajorDto } from './dto/create-university-major.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UniversityMajor,
  UniversityMajorDocument,
} from './entities/university-major.entity';

@Injectable()
export class UniversityMajorsService {
  constructor(
    @InjectModel(UniversityMajor.name)
    private universityMajorModel: Model<UniversityMajorDocument>,
  ) {}

  async create(createUniversityMajorDto: CreateUniversityMajorDto) {
    const createdUniversityMajor = new this.universityMajorModel(
      createUniversityMajorDto,
    );

    return await createdUniversityMajor.save();
  }

  findAll() {
    return this.universityMajorModel.find().populate('university', 'name');
  }

  findOne(_id: string) {
    return this.universityMajorModel.findOne({ _id });
  }
}

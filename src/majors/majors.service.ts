import { Injectable } from '@nestjs/common';
import { CreateMajorDto } from './dto/create-major.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Major, MajorDocument } from './entities/major.entity';

@Injectable()
export class MajorsService {
  constructor(
    @InjectModel(Major.name)
    private majorModel: Model<MajorDocument>,
  ) {}

  async create(createMajorDto: CreateMajorDto) {
    const createdMajor = new this.majorModel(createMajorDto);

    return await createdMajor.save();
  }

  findAll() {
    return this.majorModel.find();
  }
}

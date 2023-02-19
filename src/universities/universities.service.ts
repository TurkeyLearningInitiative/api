import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  University,
  UniversityDocument,
} from '~/universities/entities/university.entity';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectModel(University.name)
    private universityModel: Model<UniversityDocument>,
  ) {}

  findAll() {
    return this.universityModel.find();
  }

  findOne(_id: string) {
    return this.universityModel.findOne({ _id });
  }
}

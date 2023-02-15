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

  async findAll() {
    const universities = await this.universityModel.find();

    return universities;
  }
}

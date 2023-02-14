import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, ClassDocument } from './entities/class.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name)
    private classModel: Model<ClassDocument>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const createdClass = new this.classModel(createClassDto);

    return await createdClass.save();
  }

  async findAll() {
    return this.classModel.find();
  }
  async remove(_id: string) {
    return this.classModel.remove({_id});
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOnlineLessonDto } from './dto/create-online-lesson.dto';
import { UpdateOnlineLessonDto } from './dto/update-online-lesson.dto';
import {
  OnlineLesson,
  OnlineLessonDocument,
} from './entities/online-lesson.entity';

@Injectable()
export class OnlineLessonsService {
  constructor(
    @InjectModel(OnlineLesson.name)
    private onlineLessonModel: Model<OnlineLessonDocument>,
  ) {}

  async create(createOnlineLessonDto: CreateOnlineLessonDto) {
    const createdOnlineLesson = new this.onlineLessonModel(
      createOnlineLessonDto,
    );
    return createdOnlineLesson.save();
  }

  async findAll() {
    return this.onlineLessonModel.find();
  }

  async update(id: string, updateOnlineLessonDto: UpdateOnlineLessonDto) {
    return this.onlineLessonModel.findByIdAndUpdate(id, updateOnlineLessonDto, {
      new: true,
      returnDocument: 'after',
    });
  }

  async findOne(_id: string) {
    return this.onlineLessonModel.findOne({ _id });
  }

  async remove(_id: string) {
    return this.onlineLessonModel.findOneAndRemove({ _id });
  }
}

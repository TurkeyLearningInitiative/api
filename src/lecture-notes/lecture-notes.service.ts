import { Injectable } from '@nestjs/common';
import { CreateLectureNoteDto } from './dto/create-lecture-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  LectureNote,
  LectureNoteDocument,
} from './entities/lecture-note.entity';
import { Model } from 'mongoose';

@Injectable()
export class LectureNotesService {
  constructor(
    @InjectModel(LectureNote.name)
    private lectureNoteModel: Model<LectureNoteDocument>,
  ) {}

  async create(createLectureNoteDto: CreateLectureNoteDto) {
    const contentUrl = '';

    const createdLectureNote = new this.lectureNoteModel(createLectureNoteDto);

    return await createdLectureNote.save();
  }

  async findAll() {
    return this.lectureNoteModel.find();
  }

  async findOne(_id: string) {
    return this.lectureNoteModel.findOne({ _id });
  }

  async remove(_id: number) {
    return this.lectureNoteModel.remove({ _id });
  }
}

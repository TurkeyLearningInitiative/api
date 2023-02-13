import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLectureNoteDto } from './dto/create-lecture-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  LectureNote,
  LectureNoteDocument,
} from './entities/lecture-note.entity';
import { Model } from 'mongoose';
import { UpdateLectureNoteDto } from './dto/update-lecture-note.dto';

@Injectable()
export class LectureNotesService {
  constructor(
    @InjectModel(LectureNote.name)
    private lectureNoteModel: Model<LectureNoteDocument>,
  ) {}

  async create(createLectureNoteDto: CreateLectureNoteDto) {
    const searchText = `${createLectureNoteDto.title} ${createLectureNoteDto.description} ${createLectureNoteDto.tags} ${createLectureNoteDto.author} `;
    const createdLectureNote = await this.lectureNoteModel.create({
      ...createLectureNoteDto,
      searchText,
    });

    return createdLectureNote;
  }

  async findAll() {
    return this.lectureNoteModel.find();
  }

  async update(id: string, updateLectureNoteDto: UpdateLectureNoteDto) {
    return await this.lectureNoteModel.findByIdAndUpdate(
      id,
      updateLectureNoteDto,
      {
        new: true,
        returnDocument: 'after',
      },
    );
  }

  async findOne(_id: string) {
    return this.lectureNoteModel.findOne({ _id });
  }

  async remove(_id: number) {
    return this.lectureNoteModel.remove({ _id });
  }
}

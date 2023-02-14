import { Injectable } from '@nestjs/common';
import { CreateLectureNoteDto } from './dto/create-lecture-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  LectureNote,
  LectureNoteDocument,
} from './entities/lecture-note.entity';
import { Model } from 'mongoose';
import { UpdateLectureNoteDto } from './dto/update-lecture-note.dto';
import { FileUploadService } from '~/file-upload/file-upload.service';
import { UploadFileDto } from '~/file-upload/dto/upload-file.dto';

@Injectable()
export class LectureNotesService {
  constructor(
    @InjectModel(LectureNote.name)
    private lectureNoteModel: Model<LectureNoteDocument>,
    private fileUploader: FileUploadService,
  ) {}

  async create(
    createLectureNoteDto: CreateLectureNoteDto,
    fileBuffer: Buffer | File,
    fileMimeType: string,
  ) {
    const uploadFileDto: UploadFileDto = {
      name: createLectureNoteDto.title,
      key: createLectureNoteDto.title,
      contentType: fileMimeType,
      body: fileBuffer,
    };
    const contentUrl = await this.fileUploader.upload(uploadFileDto);

    const searchText = `${createLectureNoteDto.title} ${createLectureNoteDto.description} ${createLectureNoteDto.tags} ${createLectureNoteDto.author} `;

    return await this.lectureNoteModel.create({
      ...createLectureNoteDto,
      searchText,
      contentUrl,
    });
  }

  async findAll() {
    return this.lectureNoteModel.find();
  }

  async update(id: string, updateLectureNoteDto: UpdateLectureNoteDto) {
    return this.lectureNoteModel.findByIdAndUpdate(id, updateLectureNoteDto, {
      new: true,
      returnDocument: 'after',
    });
  }

  async findOne(_id: string) {
    return this.lectureNoteModel.findOne({ _id });
  }

  async remove(_id: number) {
    return this.lectureNoteModel.remove({ _id });
  }
}

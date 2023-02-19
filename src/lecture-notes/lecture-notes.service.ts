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
import { generateSearchText } from '~/common/utils';
import { VerifyLectureNoteDto } from '~/lecture-notes/dto/verify-lecture-note.dto';

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

    const searchText = generateSearchText(createLectureNoteDto);

    const contentUrl = await this.fileUploader.upload(uploadFileDto);

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

  async verify(verifyLectureNoteDto: VerifyLectureNoteDto) {
    return this.lectureNoteModel.findByIdAndUpdate(
      verifyLectureNoteDto.lectureNoteId,
      { isVerified: true },
      {
        new: true,
        returnDocument: 'after',
      },
    );
  }
}

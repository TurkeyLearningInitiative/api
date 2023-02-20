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
import {
  generateSearchLectureNoteDto,
  generateSearchText,
  GenerateSearchTextDto,
} from '~/common/utils';
import { VerifyLectureNoteDto } from '~/lecture-notes/dto/verify-lecture-note.dto';
import { UniversitiesService } from '~/universities/universities.service';
import { UniversityMajorsService } from '~/university-majors/university-majors.service';
import { CoursesService } from '~/courses/courses.service';
import { LectureNotesQueryDto } from './dto/search-lecture-note.dto';

@Injectable()
export class LectureNotesService {
  constructor(
    @InjectModel(LectureNote.name)
    private lectureNoteModel: Model<LectureNoteDocument>,
    private fileUploader: FileUploadService,
    private universitiesService: UniversitiesService,
    private universityMajorsService: UniversityMajorsService,
    private coursesService: CoursesService,
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

    /* eslint-disable */
    let generateTextDto: GenerateSearchTextDto = {
      title: createLectureNoteDto.title,
      description: createLectureNoteDto.description,
      author: createLectureNoteDto.author,
    };

    if (createLectureNoteDto.university) {
      const university = await this.universitiesService.findOne(
        createLectureNoteDto.university,
      );
      generateTextDto.university = university.name;
    }

    if (createLectureNoteDto.universityMajor) {
      const universityMajor = await this.universityMajorsService.findOne(
        createLectureNoteDto.universityMajor,
      );
      generateTextDto.universityMajor = universityMajor.name;
    }

    if (createLectureNoteDto.course) {
      const course = await this.coursesService.findOne(
        createLectureNoteDto.course,
      );
      generateTextDto.course = course.name;
    }

    if (createLectureNoteDto.tags) {
      generateTextDto.tags = createLectureNoteDto.tags;
    }

    const searchText = generateSearchText(generateTextDto);

    const contentUrl = await this.fileUploader.upload(uploadFileDto);

    return await this.lectureNoteModel.create({
      ...createLectureNoteDto,
      searchText,
      contentUrl,
    });
  }

  async findAll(queryParams: LectureNotesQueryDto) {
    try {
      const query = generateSearchLectureNoteDto(queryParams);
  
      const lectureNotes = await this.lectureNoteModel.find(query);
  
      return lectureNotes || [];
    } catch (error) {
      return [];
    }
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

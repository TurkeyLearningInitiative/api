import { Module } from '@nestjs/common';
import { LectureNotesService } from './lecture-notes.service';
import { LectureNotesController } from './lecture-notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureNote, LectureNoteSchema } from './entities/lecture-note.entity';
import { FileUploadService } from '~/file-upload/file-upload.service';
import { S3Client } from '~/file-upload/s3-client/s3-client';
import { UniversitiesModule } from '~/universities/universities.module';
import { UniversityMajorsModule } from '~/university-majors/university-majors.module';
import { CoursesModule } from '~/courses/courses.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LectureNote.name, schema: LectureNoteSchema },
    ]),
    UniversitiesModule,
    UniversityMajorsModule,
    CoursesModule,
  ],
  controllers: [LectureNotesController],
  providers: [LectureNotesService, FileUploadService, S3Client],
})
export class LectureNotesModule {}

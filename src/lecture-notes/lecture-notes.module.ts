import { Module } from '@nestjs/common';
import { LectureNotesService } from './lecture-notes.service';
import { LectureNotesController } from './lecture-notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureNote, LectureNoteSchema } from './entities/lecture-note.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LectureNote.name, schema: LectureNoteSchema },
    ]),
  ],
  controllers: [LectureNotesController],
  providers: [LectureNotesService],
})
export class LectureNotesModule {}

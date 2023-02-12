import { PartialType } from '@nestjs/swagger';
import { CreateLectureNoteDto } from './create-lecture-note.dto';

export class UpdateLectureNoteDto extends PartialType(CreateLectureNoteDto) {}

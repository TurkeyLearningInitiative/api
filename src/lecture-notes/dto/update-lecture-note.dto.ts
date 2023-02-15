import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateLectureNoteDto } from './create-lecture-note.dto';

export class UpdateLectureNoteDto extends PartialType(CreateLectureNoteDto) {
  @IsBoolean()
  @IsOptional()
  isVerified: boolean;
}

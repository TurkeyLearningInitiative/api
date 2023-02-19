import { IsString } from 'class-validator';

export class VerifyLectureNoteDto {
  @IsString()
  lectureNoteId: string;
}

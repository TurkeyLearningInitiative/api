import { IsArray, IsString, IsUrl } from 'class-validator';

export class CreateLectureNoteDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsUrl()
  heroImageUrl: string;

  @IsArray()
  tags: string[];

  @IsString()
  classId: string;

  @IsString()
  majorId: string;

  @IsUrl()
  contentUrl: string;
}

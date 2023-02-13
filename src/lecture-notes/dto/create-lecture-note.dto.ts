import { IsArray, IsNotEmpty,IsOptional IsString, IsUrl } from 'class-validator';

export class CreateLectureNoteDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  uploader: string;

  @IsUrl()
  heroImageUrl: string;

  @IsArray()
  tags: string[];

  @IsString()
  classId: string;

  @IsString()
  majorId: string;

  @IsNotEmpty()
  file: File;
}

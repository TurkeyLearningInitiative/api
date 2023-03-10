import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

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

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  tags: string[] = [];

  @IsString()
  course: string;

  @IsString()
  major: string;
}

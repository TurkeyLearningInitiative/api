import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';
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

  @IsUrl()
  heroImageUrl: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  tags: string[];

  @IsString()
  classId: string;

  @IsString()
  majorId: string;
}

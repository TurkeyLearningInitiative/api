import { IsArray, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLectureNoteDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
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

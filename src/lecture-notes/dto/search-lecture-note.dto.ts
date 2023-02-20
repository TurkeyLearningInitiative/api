// lecture-notes-query.dto.ts

import { IsOptional, IsString, IsArray } from 'class-validator';

export class LectureNotesQueryDto {
  @IsOptional()
  @IsString()
  university?: string;

  @IsOptional()
  @IsString()
  course?: string;

  @IsOptional()
  @IsString()
  major?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

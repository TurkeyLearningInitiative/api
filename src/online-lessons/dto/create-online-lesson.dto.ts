import { IsDateString, IsString } from 'class-validator';

export class CreateOnlineLessonDto {
  @IsString()
  educatorName: string;

  @IsDateString()
  onlineLessonTime: Date;

  @IsString()
  lessonName: string;

  @IsString()
  lessonLink: string;

  @IsString()
  lessonDescription: string;
}

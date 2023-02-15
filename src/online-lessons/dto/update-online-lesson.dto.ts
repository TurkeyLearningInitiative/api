import { PartialType } from '@nestjs/swagger';
import { CreateOnlineLessonDto } from './create-online-lesson.dto';

export class UpdateOnlineLessonDto extends PartialType(CreateOnlineLessonDto) {}

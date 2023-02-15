import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OnlineLessonsService } from './online-lessons.service';
import { CreateOnlineLessonDto } from './dto/create-online-lesson.dto';
import { UpdateOnlineLessonDto } from './dto/update-online-lesson.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('online-lessons')
@ApiTags('Online Lessons')
export class OnlineLessonsController {
  constructor(private readonly onlineLessonsService: OnlineLessonsService) {}

  @Post()
  create(@Body() createOnlineLessonDto: CreateOnlineLessonDto) {
    return this.onlineLessonsService.create(createOnlineLessonDto);
  }

  @Get()
  findAll() {
    return this.onlineLessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onlineLessonsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOnlineLessonDto: UpdateOnlineLessonDto,
  ) {
    return this.onlineLessonsService.update(id, updateOnlineLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onlineLessonsService.remove(id);
  }
}

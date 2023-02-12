import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LectureNotesService } from './lecture-notes.service';
import { CreateLectureNoteDto } from './dto/create-lecture-note.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lecture Notes')
@Controller('lecture-notes')
export class LectureNotesController {
  constructor(private readonly lectureNotesService: LectureNotesService) {}

  @Post()
  create(@Body() createLectureNoteDto: CreateLectureNoteDto) {
    return this.lectureNotesService.create(createLectureNoteDto);
  }

  @Get()
  findAll() {
    return this.lectureNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectureNotesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectureNotesService.remove(+id);
  }
}

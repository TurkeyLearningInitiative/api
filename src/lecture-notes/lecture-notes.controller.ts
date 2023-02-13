import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LectureNotesService } from './lecture-notes.service';
import { CreateLectureNoteDto } from './dto/create-lecture-note.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateLectureNoteDto } from './dto/update-lecture-note.dto';
import { AccessTokenGuard } from '~/authentication';
import RoleGuard from '~/authentication/guards/role.guard';
import { Roles } from '~/common/constants';

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

  @UseGuards(RoleGuard(Roles.Admin))
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLectureNoteDto: UpdateLectureNoteDto,
  ) {
    return this.lectureNotesService.update(id, updateLectureNoteDto);
  }
  @UseGuards(RoleGuard(Roles.Admin))
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectureNotesService.remove(+id);
  }
}

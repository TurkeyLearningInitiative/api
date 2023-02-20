import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LectureNotesService } from './lecture-notes.service';
import { CreateLectureNoteDto } from './dto/create-lecture-note.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateLectureNoteDto } from './dto/update-lecture-note.dto';
import { AccessTokenGuard } from '~/authentication';
import RoleGuard from '~/authentication/guards/role.guard';
import { MAXIMUM_FILE_SIZE, Roles } from '~/common/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { SizeLimitInterceptor } from '~/lecture-notes/interceptors/file-size.interceptor';

@ApiTags('Lecture Notes')
@Controller('lecture-notes')
export class LectureNotesController {
  constructor(private readonly lectureNotesService: LectureNotesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true })
  @UseInterceptors(new SizeLimitInterceptor(1024 * 1024 * MAXIMUM_FILE_SIZE)) // Bedirhan fixed
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createLectureNoteDto: CreateLectureNoteDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.lectureNotesService.create(
      createLectureNoteDto,
      file.buffer,
      file.mimetype,
    );
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

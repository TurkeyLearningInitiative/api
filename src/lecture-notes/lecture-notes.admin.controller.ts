import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LectureNotesService } from './lecture-notes.service';
import { ApiTags } from '@nestjs/swagger';
import { VerifyLectureNoteDto } from '~/lecture-notes/dto/verify-lecture-note.dto';
import RoleGuard from '~/authentication/guards/role.guard';
import { Roles } from '~/common/constants';
import { AccessTokenGuard } from '~/authentication';

@ApiTags('ADMIN Lecture Notes')
@Controller('admin/lecture-notes/verify')
export class LectureNotesController {
  constructor(private readonly lectureNotesService: LectureNotesService) {}

  @Post()
  @UseGuards(RoleGuard(Roles.Admin))
  @UseGuards(AccessTokenGuard)
  verify(@Body() verifyLectureNoteDto: VerifyLectureNoteDto) {
    return this.lectureNotesService.verify(verifyLectureNoteDto);
  }
}

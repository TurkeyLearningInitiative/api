import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '~/authentication';
import RoleGuard from '~/authentication/guards/role.guard';
import { Roles } from '~/common/constants';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createClassDto: CreateCourseDto) {
    return this.coursesService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @UseGuards(RoleGuard(Roles.Admin))
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}

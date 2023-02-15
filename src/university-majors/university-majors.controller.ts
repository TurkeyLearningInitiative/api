import { Body, Controller, Get, Post } from '@nestjs/common';
import { UniversityMajorsService } from './university-majors.service';
import { CreateUniversityMajorDto } from './dto/create-university-major.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('University Majors')
@Controller('university-majors')
export class UniversityMajorsController {
  constructor(
    private readonly universityMajorsService: UniversityMajorsService,
  ) {}

  @Post()
  create(@Body() createMajorDto: CreateUniversityMajorDto) {
    return this.universityMajorsService.create(createMajorDto);
  }

  @Get()
  findAll() {
    return this.universityMajorsService.findAll();
  }
}

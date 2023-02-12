import { Body, Controller, Get, Post } from '@nestjs/common';
import { MajorsService } from './majors.service';
import { CreateMajorDto } from './dto/create-major.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Majors')
@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @Post()
  create(@Body() createMajorDto: CreateMajorDto) {
    return this.majorsService.create(createMajorDto);
  }

  @Get()
  findAll() {
    return this.majorsService.findAll();
  }
}

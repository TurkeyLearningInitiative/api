import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll() {
    return this.classesService.findAll();
  }
}

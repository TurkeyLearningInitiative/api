import { Controller, Get } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Universities')
@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  findAll() {
    return this.universitiesService.findAll();
  }
}

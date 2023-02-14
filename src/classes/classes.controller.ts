import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '~/authentication';
import RoleGuard from '~/authentication/guards/role.guard';
import { Roles } from '~/common/constants';

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

  @UseGuards(RoleGuard(Roles.Admin))
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserVerificationService } from './user-verification.service';
import RoleGuard from '~/authentication/guards/role.guard';
import { AccessTokenGuard } from '~/authentication';
import { Roles } from '~/common/constants';
import { PaginationParams } from './dto/pagination-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userVerificationService: UserVerificationService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);

    await this.userVerificationService.sendEmailVerificatonNumber({
      email: createUserDto.email,
      name: createUserDto.name,
    });

    return { message: 'User created' };
  }

  @UseGuards(RoleGuard(Roles.Admin))
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Query() { skip, limit }: PaginationParams) {
    return this.usersService.findAll({ skip, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  //TODO: Add hashing to password before brute save
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}

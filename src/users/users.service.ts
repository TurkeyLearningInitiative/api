import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationParams } from './dto/pagination-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getUserByEmailDefault(email: string) {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new HttpException(
        'User with this email not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const isUserExist = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (isUserExist) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password, ...user } = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll({ skip, limit }: PaginationParams) {
    const userQueryFilter = this.userModel.find().skip(skip).limit(limit);
    const users = await userQueryFilter.exec();
    const count = await this.userModel.countDocuments().exec();

    return { users, count };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      returnDocument: 'after',
    });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}

import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '~/common/constants';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '~/users/entities/user.entity';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService /*     @InjectModel(User.name)
    private userModel: Model<UserDocument>, */,
  ) {}

  public async register(registrationData: RegisterDto) {
    try {
      const isAlreadyRegistered = await this.usersService.getUserByEmailDefault(
        registrationData.email,
      );
      if (isAlreadyRegistered) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);

      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
        role: registrationData.email.includes('.edu')
          ? Roles.Student
          : Roles.Default,
      });
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  public async login({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.getUserByEmail(email);
    await this.verifyPassword(password, user.password);
    user.password = undefined;
    const tokens = this.getTokens({ email: user.email, userId: user._id });

    return tokens;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private getTokens(user: { email: string; userId: string }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.userId },
      {
        expiresIn: process.env.EXPIRES_IN,
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      },
    );

    return { accessToken };
  }
  public async googleLogin(@Req() req) {
    const user = await {
      email: req.user.email,
      name: req.user.firstName,
      surname: req.user.lastName,
      password: req.user.accessToken,
    };
    return user;
  }
}

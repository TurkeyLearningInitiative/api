import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserVerificationService } from '~/users/user-verification.service';
import { AuthenticationService } from './authentication.service';
import { RegisterDto, RequestWithUser } from './dto';
import { AccessTokenGuard, LocalAuthenticationGuard } from './guards';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userVerificationService: UserVerificationService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    await this.authenticationService.register(registrationData);
    await this.userVerificationService.sendEmailVerificatonNumber({
      email: registrationData.email,
      name: registrationData.name,
    });
    return { message: 'Registration successful' };
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return await this.authenticationService.login({
      email,
      password,
    });
  }

  @Get('verify-email')
  async verifyEmail(
    @Query('email') email: string,
    @Query('verificationCode') verificationCode: string,
  ) {
    if (!email || !verificationCode)
      throw new HttpException(
        'Invalid email or verification code',
        HttpStatus.BAD_REQUEST,
      );
    return await this.userVerificationService.verifyEmail(
      email,
      verificationCode,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get('private-hello')
  sayHello(@Req() request: RequestWithUser) {
    return 'Hey guest, you are authenticated! your email:' + request.user.email;
  }
}

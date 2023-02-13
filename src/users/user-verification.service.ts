import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MailService } from '~/mail';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { generate6DigitNumber, getUserVerifyKey } from '~/common/utils';

@Injectable()
export class UserVerificationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly mailService: MailService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async sendEmailVerificatonNumber(params: { email: string; name: string }) {
    const verificationNumber = generate6DigitNumber();
    /* TODO: ttl to constants */
    await this.cacheManager.set(
      getUserVerifyKey(params.email),
      verificationNumber,
      300000,
    );
    await this.mailService.sendVerificationMail({
      ...params,
      verificationNumber,
    });
  }

  async verifyEmail(email: string, verificationCode: string) {
    const verificationCodeInCache = await this.cacheManager.get(
      getUserVerifyKey(email),
    );
    if (verificationCodeInCache !== verificationCode) {
      throw new HttpException(
        'Verification code is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const currUser = await this.userModel.findOne({ email });
    const updatedUser = await this.userModel.findByIdAndUpdate(
      currUser._id,
      { isEmailVerified: true },
      {
        returnDocument: 'after',
      },
    );
    await this.cacheManager.del(getUserVerifyKey(email));
    return updatedUser;
  }
}

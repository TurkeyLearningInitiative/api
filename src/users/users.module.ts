import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserVerificationService } from './user-verification.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CacheModule.register(),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserVerificationService],
  exports: [UsersService, UserVerificationService],
})
export class UsersModule {}

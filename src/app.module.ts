import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureNotesModule } from './lecture-notes/lecture-notes.module';
import { MajorsModule } from './majors/majors.module';
import { ClassesModule } from './classes/classes.module';
import { AuthenticationModule } from './authentication';
import { MailModule } from './mail';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        signOptions: { expiresIn: process.env.EXPIRES_IN },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: process.env.DB_URI,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),

    AuthenticationModule,
    LectureNotesModule,
    MajorsModule,
    ClassesModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

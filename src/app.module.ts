import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureNotesModule } from './lecture-notes/lecture-notes.module';
import { UniversityMajorsModule } from './university-majors/university-majors.module';
import { CoursesModule } from './courses/courses.module';
import { FileUploadService } from './file-upload/file-upload.service';
import { AuthenticationModule } from './authentication';
import { MailModule } from './mail';
import { JwtModule } from '@nestjs/jwt';
import { S3Client } from '~/file-upload/s3-client/s3-client';
import { GoogleStrategy } from './authentication/strategies/google.strategy'
import { UniversitiesModule } from './universities/universities.module';


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
    UniversityMajorsModule,
    CoursesModule,
    MailModule,
    UniversitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileUploadService, S3Client, GoogleStrategy],
})
export class AppModule {}

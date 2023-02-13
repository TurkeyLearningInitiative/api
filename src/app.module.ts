import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureNotesModule } from './lecture-notes/lecture-notes.module';
import { UsersModule } from './users/users.module';
import { MajorsModule } from './majors/majors.module';
import { ClassesModule } from './classes/classes.module';
import { S3ServiceService } from './s3-service/s3-service.service';
import { FileUploadService } from './file-upload/file-upload.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: process.env.DB_URI,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    LectureNotesModule,
    MajorsModule,
    ClassesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3ServiceService, FileUploadService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { OnlineLessonsService } from './online-lessons.service';
import { OnlineLessonsController } from './online-lessons.controller';
import {
  OnlineLesson,
  OnlineLessonSchema,
} from './entities/online-lesson.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OnlineLesson.name, schema: OnlineLessonSchema },
    ]),
  ],
  controllers: [OnlineLessonsController],
  providers: [OnlineLessonsService],
})
export class OnlineLessonsModule {}

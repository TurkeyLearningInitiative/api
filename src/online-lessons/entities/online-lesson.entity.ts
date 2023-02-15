import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OnlineLessonDocument = OnlineLesson & Document;

@Schema({ timestamps: true, versionKey: false })
export class OnlineLesson {
  @Prop({ required: true })
  educatorName: string;

  @Prop({ required: true })
  onlineLessonTime: Date;

  @Prop({ required: true })
  lessonName: string;

  @Prop({ required: true })
  lessonLink: string;

  @Prop({ required: true })
  lessonDescription: string;
}

const OnlineLessonSchema = SchemaFactory.createForClass(OnlineLesson);
OnlineLessonSchema.index({ searchText: 'text' });

export { OnlineLessonSchema };

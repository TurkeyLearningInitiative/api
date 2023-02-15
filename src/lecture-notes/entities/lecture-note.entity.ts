import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DEFAULT_HERO_IMAGES } from '~/common/constants';
import { Course } from '~/courses/entities/courses.entity';
import { Type } from 'class-transformer';
import { University } from '~/universities/entities/university.entity';

export type LectureNoteDocument = LectureNote & Document;

@Schema({ timestamps: true, versionKey: false })
export class LectureNote {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'Anonymous' })
  author: string;

  @Prop({ required: true, default: 'Anonymous' })
  uploader: string;

  @Prop({ default: DEFAULT_HERO_IMAGES.DEFAULT })
  heroImageUrl: string;

  @Prop()
  tags: string[];

  @Prop({ required: true })
  searchText: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  })
  @Type(() => Course)
  course: Course;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
  })
  @Type(() => University)
  university: University;

  @Prop({ required: true })
  contentUrl: string;

  @Prop({ default: false })
  isVerified: boolean;
}

const LectureNoteSchema = SchemaFactory.createForClass(LectureNote);
LectureNoteSchema.index({ searchText: 'text' });

export { LectureNoteSchema };

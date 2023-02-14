import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Major } from '~/majors/entities/major.entity';
import { Type } from 'class-transformer';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true, versionKey: false })
export class Course {
  @Prop({ required: true })
  name: string;

  // @Prop({ required: true })
  // majorId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Major',
  })
  @Type(() => Major)
  major: Major;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UniversityMajor } from '~/university-majors/entities/university-major.entity';
import { Type } from 'class-transformer';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true, versionKey: false })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Major',
  })
  @Type(() => UniversityMajor)
  universityMajor: UniversityMajor;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { University } from '~/universities/entities/university.entity';
import { Type } from 'class-transformer';

export type UniversityMajorDocument = UniversityMajor & Document;

@Schema({ timestamps: true, versionKey: false })
export class UniversityMajor {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
  })
  @Type(() => University)
  university: University;
}

export const MajorSchema = SchemaFactory.createForClass(UniversityMajor);

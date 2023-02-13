import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LectureNoteDocument = LectureNote & Document;

@Schema({ timestamps: true })
export class LectureNote {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'Anonymous' })
  author: string;

  @Prop({ required: true, default: 'Anonymous' })
  uploader: string;

  @Prop({ required: true })
  heroImageUrl: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  searchText: string;

  @Prop({ required: true })
  classId: string;

  @Prop({ required: true })
  majorId: string;

  @Prop({ required: true })
  contentUrl: string;

  @Prop({ default: false })
  isVerified: boolean;
}

const LectureNoteSchema = SchemaFactory.createForClass(LectureNote);
LectureNoteSchema.index({ searchText: 'text' });

export { LectureNoteSchema };

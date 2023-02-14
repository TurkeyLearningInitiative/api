import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UniversityDocument = Document & University;

@Schema({ timestamps: true, versionKey: false })
export class University {
  @Prop({ required: true, type: [{ type: String }] })
  webPages: string[];
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  alphaTwoCode: string;
  @Prop({ required: true, type: [{ type: String }] })
  domains: string[];
  @Prop({ required: true })
  country: string;
}

export const UniversitySchema = SchemaFactory.createForClass(University);

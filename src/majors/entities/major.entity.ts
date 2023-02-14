import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MajorDocument = Major & Document;

@Schema({ timestamps: true, versionKey: false })
export class Major {
  @Prop({ required: true })
  name: string;
}

export const MajorSchema = SchemaFactory.createForClass(Major);

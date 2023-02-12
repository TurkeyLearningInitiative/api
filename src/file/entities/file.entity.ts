import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  url: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: true })
  key: string;
}

export const FileSchema = SchemaFactory.createForClass(File);

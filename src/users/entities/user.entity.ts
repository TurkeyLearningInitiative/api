import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { Roles } from '~/common/constants';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ min: 8, required: true, select: false })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ type: String, enum: Roles, default: Roles.Student })
  role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, default: uuid })
  id: string;

  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: ['user'],
  })
  roles: string[];

  @Prop()
  avatar: string;

  @Prop()
  description: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ unique: true, default: uuid })
  id: string;

  @Prop({ require: true })
  title: string;

  @Prop()
  price: number;

  @Prop({ required: true })
  idUser: string;

  @Prop()
  description: string;

  @Prop()
  conver: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

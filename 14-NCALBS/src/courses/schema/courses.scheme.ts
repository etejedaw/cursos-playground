import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ require: true })
  title: string;

  @Prop()
  price: number;

  // @Prop()
  // idUser: ObjectId;

  @Prop()
  description: string;

  @Prop()
  conver: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

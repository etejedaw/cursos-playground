import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type AwardDocument = Award & Document;

@Schema()
export class Award {
  @Prop({ require: true })
  title: string;

  @Prop()
  idUser: ObjectId;

  @Prop()
  description: string;
}

export const AwardSchema = SchemaFactory.createForClass(Award);

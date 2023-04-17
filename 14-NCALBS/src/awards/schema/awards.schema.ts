import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type AwardDocument = Award & Document;

@Schema()
export class Award {
  @Prop({ unique: true, default: uuid })
  id: string;

  @Prop({ require: true })
  title: string;

  @Prop()
  idUser: ObjectId;

  @Prop()
  description: string;
}

export const AwardSchema = SchemaFactory.createForClass(Award);

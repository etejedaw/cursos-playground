import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({ timestamps: true })
export class Video {
  @Prop()
  title: string;

  @Prop()
  idCourse: ObjectId;

  @Prop()
  description: string;

  @Prop()
  source: string;

  @Prop()
  score: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

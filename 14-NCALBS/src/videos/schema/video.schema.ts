import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

export type VideoDocument = Video & Document;

@Schema({ timestamps: true })
export class Video {
  @Prop({ unique: true, default: uuid })
  id: string;

  @Prop()
  title: string;

  @Prop()
  idCourse: string;

  @Prop()
  description: string;

  @Prop({ default: null })
  source: string;

  @Prop({ default: 0 })
  score: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  imageUrl: string;
  @Prop({ default: 0 })
  lokeCount: number;
}

export const postSchema = SchemaFactory.createForClass(Post);

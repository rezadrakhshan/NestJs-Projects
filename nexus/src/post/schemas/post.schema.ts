import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PostDocument = mongoose.HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userID: mongoose.Types.ObjectId;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  imagesUrl: string[];
  @Prop({ default: 0 })
  likeCount: number;
}

export const postSchema = SchemaFactory.createForClass(Post);

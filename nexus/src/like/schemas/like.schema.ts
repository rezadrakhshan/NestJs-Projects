import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type LikeDocument = mongoose.HydratedDocument<Like>;

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  postID: mongoose.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userID: mongoose.Types.ObjectId;
}

export const likeSchema = SchemaFactory.createForClass(Like);

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type FollowDocument = mongoose.HydratedDocument<Follow>;

@Schema({ timestamps: true })
export class Follow {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  follower: mongoose.Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  following: mongoose.Types.ObjectId;
}

export const followSchema = SchemaFactory.createForClass(Follow);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import mongoose from 'mongoose';

export type taskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  text: string;
  @Prop({ default: false })
  isCompleted: boolean;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userID: User;
}

export const taskSchema = SchemaFactory.createForClass(Task);

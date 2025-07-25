import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CodeDocument = HydratedDocument<Code>;

@Schema()
export class Code {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  code: string;
  @Prop({ required: true })
  expireAt: Date;
}

export const codeSchema = SchemaFactory.createForClass(Code);
codeSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CustomerDocument = mongoose.HydratedDocument<Customer>;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userID: mongoose.Types.ObjectId;
  @Prop({ required: true })
  fullname: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phone: string;
  @Prop()
  company?: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  postalCode: number;
  @Prop({ required: true })
  country: string;
  @Prop()
  notes?: string;
}

export const customerSchema = SchemaFactory.createForClass(Customer);

import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type InvoiceDocument = mongoose.HydratedDocument<Invoice>;

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userID: mongoose.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  customerID: mongoose.Types.ObjectId;
  @Prop({
    type: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    required: true,
  })
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  @Prop({ required: true })
  total: number;
  @Prop({ enum: ['draft', 'sent', 'paid', 'overdue'], default: 'draft' })
  status: string;
  @Prop({ required: true })
  issueDate: Date;
  @Prop({ required: true })
  dueDate: Date;
  @Prop()
  notes?: string;
}

export const invoiceSchema = SchemaFactory.createForClass(Invoice);

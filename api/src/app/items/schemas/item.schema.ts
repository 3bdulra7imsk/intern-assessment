import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  owner: string; // User email who owns this item

  @Prop({ default: false })
  completed: boolean; // For todo-like functionality
}

export const ItemSchema = SchemaFactory.createForClass(Item);

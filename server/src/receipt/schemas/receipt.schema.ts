import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Tag } from './tag.schema';

export type ReceptDocument = Recept & Document;

@Schema()
export class Recept {
  @Prop()
  name: string;

  @Prop()
  shop_name: string;
  
  @Prop()
  price: number;

  @Prop()
  recfile: string;

  @Prop() 
  purc_date: string;
  
  @Prop()
  val_period: string;
  
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref:'Tag'}]})
  tag: Tag[];
  

}

export const ReceiptSchema = SchemaFactory.createForClass(Recept);
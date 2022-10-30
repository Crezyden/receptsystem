import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
  
  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref:'Tag'}]})
  tag: Tag;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
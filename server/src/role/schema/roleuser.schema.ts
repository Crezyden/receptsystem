import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document} from "mongoose";

export type RoleUserDocument = RoleUser & Document;

@Schema()
export class RoleUser{
	
	@Prop({required: true})
	userId :number;
	
	@Prop({required: true})
	roleId: number;


}
export const RoleUserSchema = SchemaFactory.createForClass(RoleUser);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from "mongoose";
import * as mongoose from "mongoose";
import { Role } from '../../role/schema/role.schema';
export type UserDocument = User & Document;

@Schema()
export class User{
	
	@Prop({required: true})
	name: string;
	
	@Prop({required: true, unique: true})
	email: string;

	@Prop({required: true})
	password: string;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'role'})
	role: Role;

}
export const UserSchema = SchemaFactory.createForClass(User);
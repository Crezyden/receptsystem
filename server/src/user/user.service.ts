import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserDetails } from './user-details.interface';
import { RoleService } from './../role/role.service';
import { Delete } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { NewsUserdto } from './dto/newsuser.dto';
@Injectable()
export class UserService {
	constructor(@InjectModel('User') private readonly  userModel: Model<UserDocument>,
				private roleService:  RoleService){}

	async getAllUser(){
		const user = await this.userModel.find({include:{all:true}});
		return user;
	}
	// _getUserDetails(user: UserDocument):UserDetails{
	// 	return{
	// 		_id: user._id,
	// 		name: user.name,
	// 		email: user.email
	// 	};
	// }
	// async findByEmail(email: string): Promise<UserDocument | null>{
	// 	return this.userModel.findOne({email},{all:true}).exec();
	// }
	// async findById(id: string): Promise<UserDetails | null>{
	// 	const user = await this.userModel.findById(id).exec();
	// 	if(!user)  throw new NotFoundException('User not found');  
	// 	return this._getUserDetails(user);
	// }
	// async create(name:string, email: string, hashedPassword: string):
	// Promise<UserDocument>{
	// 	const role = await this.roleService.getRoleByValue("User");
	// 	const user=  new this.userModel({
		// 		name,
		// 		email,
		// 		password: hashedPassword,
		// 		role: role,
		// 	})
		// 	await user.$set('roles', [role.id])
		// 	// user = [role]
		// 	return user.save()
		// }
		async delete(id: ObjectId): Promise<ObjectId>{
			const user = await this.userModel.findByIdAndDelete(id)
			return user._id
		}
		
		_getUserDetails(user: UserDocument):UserDetails{
			return{
				id: user._id,
				name: user.name,
			email: user.email,
			// roles: user.role
		};
	}
	async findByEmail(email: string): Promise<UserDocument | null>{
		return this.userModel.findOne({email}).exec();
	}
	async findById(id: string): Promise<UserDetails | null>{
		const user = await this.userModel.findById(id).exec();
		if(!user) return null;  
		return this._getUserDetails(user);
	}
	async create(userDto: NewsUserdto):
	Promise<UserDocument>{
		const role = await this.roleService.getRoleByValue("User");
		const user= await this.userModel.create(userDto);
		await user.$set('roles', [role.id]);
		user.role=role;
		return user.save()
	}
}

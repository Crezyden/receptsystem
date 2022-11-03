import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';
import { ObjectId } from 'mongoose';

@Controller('/user')
export class UserController {

	constructor(private  usersService: UserService){}
	@Get(':id')
	getUser(@Param('id') id: string): Promise<UserDetails | null>{
		return this.usersService.findById(id)
	}
	// @Post()
	// createUser(@Body() userDto: Userdto){
	// 	return this.usersService.createUser(userDto)
	// }
	@Get()
	getAllUser(){
		return this.usersService.getAllUser();
	}
	// @Delete()
    // delete() {
    //     return this.usersService.delete();
    // }
	@Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.usersService.delete(id);
    }
} 

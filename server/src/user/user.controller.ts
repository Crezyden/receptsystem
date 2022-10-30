import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
// import { NewsUserdto } from './dto/news-user.dto';
import { UserDetails } from './user-details.interface';

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
	// @Get()
	// getAllUser(@Body() userDto: ExistUserdto){
	// 	return this.usersService.getAllUser(userDto)
	// }
} 

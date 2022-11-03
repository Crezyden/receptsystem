import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewsUserdto } from '../user/dto/newsuser.dto';
import { CreateUserdto } from '../user/dto/Createuser.dto';
import { UserDetails } from '../user/user-details.interface';
import { AuthService } from './auth.service';
@ApiTags('Autoriization')
@Controller('/auth')
export class AuthController {
	constructor(private  authService: AuthService){}
	@Post('/register')
	register(@Body() user: NewsUserdto): Promise<UserDetails | null>{
		return this.authService.register(user); 
	}
	@Post('/login')
	@HttpCode(HttpStatus.OK)
	login(@Body() user: CreateUserdto): Promise<{token:string} | null>{
		return this.authService.login(user); 
	}

	// @Post('/local/signin')
	// signinLocal(@Body() dto: AuthDto): any{
	// 	return this.authService.signinLocal(dto);
	// }
	// @Post('/local/signout')
}

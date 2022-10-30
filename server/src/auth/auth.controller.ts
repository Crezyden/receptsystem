import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewsUserdto } from '../user/dto/news-user.dto';
import { ExistingUserdto } from '../user/dto/user.dto';
import { UserDetails } from '../user/user-details.interface';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authcreate.dto';
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
	login(@Body() user: ExistingUserdto): Promise<{token:string} | null>{
		return this.authService.login(user); 
	}

	// @Post('/local/signin')
	// signinLocal(@Body() dto: AuthDto): any{
	// 	return this.authService.signinLocal(dto);
	// }
	// @Post('/local/signout')
}

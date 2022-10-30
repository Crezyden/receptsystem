import { Injectable, Provider, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/';
import * as bcrypt from 'bcrypt'
import { UserService } from './../user/user.service';
import { NewsUserdto } from './../user/dto/news-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUserdto } from '../user/dto/user.dto';
@Injectable()
export class AuthService {
	// constructor(){},
	constructor(private userService:UserService,private jwtService: JwtService){}
	async hashedPassword(password: string): Promise<string>{
		return bcrypt.hash(password, 12);
	}
	async register(user: Readonly<NewsUserdto>): Promise<UserDetails | any>{
		const{ name, email, password , role} = user;
		const existingUser = await this.userService.findByEmail(email);
		if(existingUser) return 'Email taken!';
		const hashedPassword = await this.hashedPassword(password);
		const newUser = await this.userService.create(name, email, hashedPassword, role);
		return this.userService._getUserDetails(newUser);
		}
	async doesPasswordMatch(password: string, hashedPassword: string,): Promise<boolean>{
	
		return bcrypt.compare(password, hashedPassword)
	}
	async validateUser(email: string, password: string): Promise<UserDetails |null>{
		const user = await this.userService.findByEmail(email);
		const doesUserexist =!!user;
		if (!doesUserexist) return null;
		
		const doesPasswordMatch = await this.doesPasswordMatch(password,user.password);

		if(!doesPasswordMatch) return null;
		return this.userService._getUserDetails(user);

	}
	async login(existingUser: ExistingUserdto,): Promise<{token: string}|null>{
		const {email, password} = existingUser;
		const user = await  this.validateUser(email, password);
		if(!user) return null;
		const jwt = await this.jwtService.signAsync({
			user
		})
		return {token: jwt}
	}
	// signinLocal(dto: AuthDto){ 
	// 	const user = users.find((_user)=>_user.email === dto.email);
	// 	if(!user) throw new UnauthorizedException('Credenctials incorrect');
	// 	if(user.password !== dto.password) 
	// 		throw new UnauthorizedException('Credenctials incorrectre3efrfd1');
	// 	return user;
	// 	// this.signUser(user.id, user.email, 'User')
	// }
	// signupLocal(dto: AuthDto){}
	// signUser(userId: number, email: string, type:string) {
	// 	return this.jwtService.sign({
	// 		sub: 
	// 		userId, 
	// 		email, 
	// 		claim: type 
	// 	});	
	//   }
}

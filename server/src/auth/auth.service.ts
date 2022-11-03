import { HttpException, Injectable, Provider, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';
import { NewsUserdto } from './../user/dto/newsuser.dto';
import { UserDetails } from '../user/user-details.interface';
import { CreateUserdto } from '../user/dto/Createuser.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
@Injectable()
export class AuthService {
	// constructor(){},
	constructor(private userService:UserService,private jwtService: JwtService){}
	async hashedPassword(password: string): Promise<string>{
		return bcrypt.hash(password, 12);
	}
	async register(userDto: Readonly<NewsUserdto>): Promise<UserDetails | any>{
		const existingUser = await this.userService.findByEmail(userDto.email);
		if(existingUser) {
			throw new HttpException('user already registered', HttpStatus.BAD_REQUEST)
		}
		const hashedPassword = await this.hashedPassword(userDto.password);
		const newUser = await this.userService.create({...userDto, password:hashedPassword});
		return this.userService._getUserDetails(newUser)
		}
	async generateToken(newUser: User){
		
	}
	
	async doesPasswordMatch(password: string, hashedPassword: string,): Promise<boolean>{
	
		return bcrypt.compare(password, hashedPassword)
	}
	async validateUser(email: string, password: string, role: string ): Promise<UserDetails |null>{
		const user = await this.userService.findByEmail(email);
		const doesUserexist =!!user;
		if (!doesUserexist) return null;
		
		const doesPasswordMatch = await this.doesPasswordMatch(password,user.password);

		if(!doesPasswordMatch){
			throw new HttpException('Incorrect email and password', HttpStatus.BAD_REQUEST)
		}
		return this.userService._getUserDetails(user);

	}
	async login(userDto: CreateUserdto,): Promise<{token: string}|null>{
		const user = await  this.validateUser(userDto.email, userDto.password, userDto.role);
		if(!user) return null;
		const jwt = await this.jwtService.signAsync({
			id: userDto._id,
			email: userDto.email,
			role: userDto.role
		})
		return {token: jwt}
	}
}
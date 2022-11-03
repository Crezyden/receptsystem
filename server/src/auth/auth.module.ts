import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt'
import { UserModule } from './../user/user.module';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports:[ 
    forwardRef(()=>UserModule),
    JwtModule.registerAsync({
	    useFactory: () =>({
        secret:'secret',
        signOptions: {expiresIn:'3600s'}
      }) ,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, 
              JwtGuard, JwtStrategy]
})
export class AuthModule {}

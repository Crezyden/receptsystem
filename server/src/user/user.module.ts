import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleSchema } from './../role/schema/role.schema';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './../role/role.module';
import { AuthModule } from './../auth/auth.module';
@Module({
  imports:[
  MongooseModule.forFeature([{name: 'User', schema:UserSchema}]),
  MongooseModule.forFeature([{name: 'Role', schema:RoleSchema}]),
  RoleModule,
  forwardRef(()=>AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
          UserService,
        ],

})
export class UserModule {}

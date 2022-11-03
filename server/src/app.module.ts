import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReceiptModule } from "./receipt/receipt.module";
import { AuthModule } from './auth/auth.module';
// import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://Admin:ADMIN@cluster0.56ha2sx.mongodb.net/test'),
        ReceiptModule,
        AuthModule,
        UserModule,
        RoleModule,
    ],
    providers: [],
    // controllers: [UserController]
    
})
export class AppModule{} 
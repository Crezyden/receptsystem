import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import ReceiptController from "./receipt.controller";
import { ReceiptService } from "./receipt.service";
// import { FileService } from "../file/file.service";
import { Recept,  ReceiptSchema } from './schemas/receipt.schema';
import { Tag, TagSchema } from "./schemas/tag.schema";
  
@Module({
    imports: [
    MongooseModule.forFeature([{name: Recept.name, schema:ReceiptSchema}]),
    MongooseModule.forFeature([{name: Tag.name, schema:TagSchema}])
    ],
    controllers:[ReceiptController],
    providers:[ReceiptService 
            //   FileService
            ] 
})
export class ReceiptModule{}
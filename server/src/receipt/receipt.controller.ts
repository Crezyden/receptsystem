import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateReceiptDto } from "./dto/create_receipt.dto";
import { ReceiptService } from './receipt.service';
import { FileInterceptor } from "@nestjs/platform-express";
import { ObjectId } from "mongoose";
import { ApiTags } from "@nestjs/swagger";
import { JwtGuard } from './../auth/guards/jwt.guard';

@ApiTags('Receipt')
@Controller('/receipt')
export default class ReceiptController{
    
    constructor(private receiptService: ReceiptService){}
    @Post()
    create(@Body() dto: CreateReceiptDto  ){
        return this.receiptService.create(dto);
    }
    // @UseGu ards(JwtGuard)
    @Get()
    getAll (@Query('count') count: number, @Query ('offset') offset: number){
        return this.receiptService.getAll(count, offset);
    }
   @Get('/search')
    search(@Query('query') query: string){
        return this.receiptService.searh(query);
    }
    @UseGuards(JwtGuard)
    @Get(':id')
    getOne(@Param('id') id: ObjectId){
        return this.receiptService.getOne(id);
    }
    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.receiptService.delete(id)
    }

}

// function recfile(dto: CreateReceiptDto, recfile: any) {
//     throw new Error("Function not implemented.");
// }

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
// import { FileService, FileType } from "../file/file.service";
import { CreateReceiptDto } from "./dto/create_receipt.dto";
import { Recept, ReceptDocument } from "./schemas/receipt.schema";
import { Tag, TagDocument } from "./schemas/tag.schema";

@Injectable()
export class ReceiptService{
        
  constructor(@InjectModel(Recept.name) private receiptModel: Model<ReceptDocument>,
              @InjectModel(Tag.name) private tagModel:   Model<TagDocument>, 
              // private fileServise: FileService 
  ) {}
    async create(dto: CreateReceiptDto): Promise<Recept>{
        // const recfiles = this.fileServise.createFile(FileType.recfile, recfile); 
        const receipt = await this.receiptModel.create({...dto, listens: 0})
        return receipt;
    }
    async getAll( count: number = 10, offset: number = 0): Promise<Recept[]>{
      const receipt= await this.receiptModel.find().skip(Number(offset)).limit(Number(count));
      return receipt;
    }


    async getOne(id: ObjectId): Promise<Recept>{
      const receips= await this.receiptModel.findById(id);
      return receips; 
    }

    async delete(id: ObjectId): Promise<ObjectId>{
        const receips = await this.receiptModel.findByIdAndDelete(id)        
        return receips._id;
    }
    async searh(query:string): Promise<Recept[]>{
      const receip = await this.receiptModel.find({
         name: {$regax: new RegExp(query, 'i')} 
      })
      return receip    }
}
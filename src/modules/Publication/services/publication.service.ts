import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPublication } from "../model/publication.model";
import { Publication } from "../schema/publication.schema";
import { Model } from "mongoose";

@Injectable()
export class PublicationService {
  constructor(
    @InjectModel(Publication.name) private publicationModel: Model<Publication>,
  ) {}

  async create(data: IPublication): Promise<Publication> {
    const newData = { ...data, createDate: new Date() , 
      file : data.file , 
     };
    return this.publicationModel.create(newData);
  }


  async findAll(): Promise<IPublication[]> {
    return await this.publicationModel.find();
  }



  async findPublicationById(id: string): Promise<IPublication> {
    return await this.publicationModel.findById(id);
  }

  
  async deletePublication(id: string) {
    const publicationById = await this.publicationModel.findById(id);
    if (!publicationById) {
      throw new UnauthorizedException({
        statusCode: 500,
        message: 'Publication not found',
      });
    }
    const publicationDeleted = await this.publicationModel.deleteOne({
      _id: id,
    });
    if (!publicationDeleted) {
      throw new UnauthorizedException({
        statusCode: 500,
        message: 'Publication not deleted',
      });
    }
  }

  
}

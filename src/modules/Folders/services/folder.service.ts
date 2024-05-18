
import { Injectable } from '@nestjs/common';
import { Folder, FolderDocument } from '../schemas/folder.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IFolder } from '../models/folder.model';

@Injectable()
export class FolderService {
  constructor(  @InjectModel(Folder.name) private folderModel: Model<Folder>
    //@InjectModel(Folder.name) private folderModel: Model<FolderDocument> 
  
  ){}

    // async createFolder(name: string, userId: string): Promise<Folder> {
    //     const folder = new this.folderModel({ name, userId });
    //     return folder.save();
    //   }

    async createFolder(requestData: IFolder): Promise<Folder> {
      const folder = new this.folderModel({ ...requestData });
      return folder.save();
    }

      async getAllFolders(): Promise<Folder[]> {
        try {
          return await this.folderModel.find().exec();
        } catch (error) {
          throw new Error(`Failed to get all folders: ${error.message}`);
        }
      }

      async getFolderById(id: string): Promise<Folder> {
        return this.folderModel.findById(id).exec();
      }
    
      // async addFileToFolder(folderId: string, fileId: string): Promise<void> {
      //   const folder = await this.folderModel.findById(folderId).exec();
      //   folder.files.push(fileId);
      //   await folder.save();
      // }
    
      // async removeFileFromFolder(folderId: string, fileId: string): Promise<void> {
      //   const folder = await this.folderModel.findById(folderId).exec();
      //   folder.files = folder.files.filter((id) => id.toString() !== fileId);
      //   await folder.save();
      // }

      

        //   async getFoldersByUserId(userId: string): Promise<Folder[]> {
    //     return this.folderModel.find({ userId }).exec();
    //   }
}

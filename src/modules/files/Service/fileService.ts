import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from 'buffer';
import { IFile } from '../model/files.model';
import { FileDocument } from '../schemas/file.schema';
import { User } from '@/modules/users/schemas/user.schema';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<IFile> 
) {}

async uploadFiles(
  files: any[],
  //categorie: string,
  userId: string,
  FolderID : string ,
  Username : string , 
): Promise<any[]> {
  const filesSaved = await Promise.all(
    files.map(async (file: any) => {
      const dataSave = {
        createDate: new Date(),
        fileName: file.originalname,
        folderId: FolderID  , 
        userId:userId,
        username:Username , 
        urlFile: file.filename,
      };
      return await this.fileModel.create(dataSave);
     }),
  );

  return filesSaved.map((file) => {
    return {
      fileid : file._id ,
      fileurl: file.urlFile ,
      folderId : file.FolderID  , 
      username : file.Username , 

    }
  });
}


public async getAllFiles(): Promise<IFile[]> {
  return this.fileModel.find().exec();
  }

  

async getFile(fileId: string): Promise<IFile> {
  return this.fileModel.findOne({ _id: fileId });
}



async deleteFile(fileId: string): Promise<void> {
  await this.fileModel.deleteOne({ _id: fileId });
}
  

  // async canAddToFolder(categories: string, categorie : string ) {
  //      return categories.includes(categorie);
  //    }
}

  // async canAddToFolder(folder: Folder, file: IFile) {
  //   return folder.categories.includes(file.categorie);
  // }


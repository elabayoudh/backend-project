// file.interface.ts

import { ObjectId } from "mongoose";

export interface IFile {
 _id?: ObjectId ; // MongoDB ObjectId is typically represented as a string
 FolderID : string ;
  //fileId : ObjectId ; 
  fileName: string;
  userId: any;
  Username: string;
  createDate? : Date ; 
  urlFile: string;
}

  
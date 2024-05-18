import { FileSchema } from '@/modules/files/schemas/file.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;
@Schema()
export class  Folder {
  @Prop({ required: true })
  foldername: string;

  @Prop()
  parentID : string ; 

  @Prop()
  FolderID : string ;
 
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: Date, default: Date.now })
  createDate: Date;

  @Prop()
  imagePath : string ; 

   // @Prop({ type: [{ type: FileSchema }] })
  // files: File[]; 

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }] })
  // files: string[];

}
export const FolderSchema = SchemaFactory.createForClass(Folder);


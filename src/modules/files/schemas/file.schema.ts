import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type FileDocument = HydratedDocument<File>;
@Schema()
export class File {


  @Prop({})
  FolderID : string ;  //Number 

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true , type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  //@Prop({ref: 'User' })
  @Prop({ required: false  })
  Username: string;

  @Prop({ type: Date, default: Date.now })
  createDate: Date;

  @Prop()
  urlFile: string;

  // @Prop({type: mongoose.Schema.Types.ObjectId})
  // fileId : ObjectId ;

  
}

export const FileSchema = SchemaFactory.createForClass(File);

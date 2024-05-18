import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type PublicationDocument = HydratedDocument<Publication>;

@Schema()
export class Publication {
  @Prop({ required: true })
  description: string;

  @Prop({  ref: 'User',type: mongoose.Schema.Types.ObjectId })
  userId: string ;

  @Prop({  ref: 'User'})
  firstName: string;

  
  @Prop({type : mongoose.Schema.Types.Mixed})
  file?:any ; 

  //userImage : image eli tetla3 fel interface ,



  // @Prop()
  // createDate: Date; just thabit mel database nkhaliha wala 

// @Prop({  ref: 'User' })
  // lastName: string;

  
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type NotifcationDocument = mongoose.HydratedDocument<Notification>;
@Schema()
export class Notification {

    @Prop()
    idNotif: Date;

    @Prop({ required: true })
    body: String;

    @Prop({ required: true })
    title: String;

    @Prop()
    channelkey : string ;

    @Prop({ ref: 'User', type: mongoose.SchemaTypes.ObjectId })
    sender_id: mongoose.ObjectId;

    @Prop({ required: false , ref: 'User'})
    receiver_id: string;

    @Prop({ ref: 'User' })
    username: string ; 

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date})
    sentAt: Date;
    @Prop()
    reminder: boolean; // Add this field for reminder type
    @Prop()
    customContent: string; // Add this field for custom notification content

    
    // @Prop()
    // currentUserId: string ; 

   
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);


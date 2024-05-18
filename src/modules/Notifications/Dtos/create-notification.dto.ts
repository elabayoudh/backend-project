import { ObjectId } from "mongoose";

export class CreateNotificationDto {
    readonly body: string;
    title: string;
    username  : string ; 
    sender_id: ObjectId;
    receiver_id?: ObjectId; //  coté web lazemni 
    reminder: boolean; // Add this field for reminder type
    customContent: string; // Add this field for custom notification content
    sendAt: Date; // Add this field for custom notification send time



  }
  
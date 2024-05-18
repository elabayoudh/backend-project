import { ObjectId } from "mongoose";

export interface Notification {
    title: string; // message , blog , file .... 
    body : string;
    username  : string ; 
    sender_id: ObjectId;
    receiver_id?: string; //  coté web lazemni 
    idNotif : string ; 
    channelkey : string ;
    createdAt: Date;
    reminder: boolean; // Add this field for reminder type
    customContent: string; // Add this field for custom notification content
    sendAt: Date; // Add this field for custom notification send time


    //recipient: 'company' | 'admin'; 

  }
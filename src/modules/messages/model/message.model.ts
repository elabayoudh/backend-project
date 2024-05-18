import { ObjectId } from "mongoose";

export interface IMessage{
    _id?: number;
    chat_id?: ObjectId;
    user_id:String;
    user_name: string;
   message: string; 
   createDate: Date;
  //message_id: String;


} // ajouter Chat , relation agrégation entre chat et comptable , et composition avec Messages ( ref agrégation , liste message fi wisst chat )
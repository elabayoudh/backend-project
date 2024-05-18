import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export type ChatDocument = Chat & Document;

// Définir le schéma de l'objet imbriqué
@Schema({ versionKey: false, timestamps: true })
export class Message {
@Prop()
user_id: string;

@Prop()
user_name: string;

@Prop()
message: string; 

@Prop({ type: Date, default: Date.now })
createDate: Date;
}

@Schema({ versionKey: false, timestamps: true })
export class Chat {

@Prop({ required: true })
title: string;

@Prop({ type: [Message], default: [] })
messages: Message[];

@Prop({ type: [String], default: [] }) // Liste des noms d'utilisateurs
members: string[];


}


export const ChatSchema = SchemaFactory.createForClass(Chat);



//   @Prop({ required : false , ref: 'Chat', type: SchemaTypes.ObjectId })
//   chat_id: ObjectId;

//   @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
//   user_id: ObjectId;

//   @Prop()
//   message: string; 

//   @Prop({ type: Date, default: Date.now })
//   createDate: Date;

//  // norbit message bel chat . message comme un attribut composé 
// }
// @Schema({ versionKey: false, timestamps: true })

// export class Chat {

//   @Prop({ ref: 'User', type: [SchemaTypes.ObjectId] })
//   members: [ObjectId]; //fiha les id mte3 user elibbch ya7kiou 

//   @Prop({ ref: 'User' })
//   usernames: []; //fiha les id mte3 user elibbch ya7kiou 
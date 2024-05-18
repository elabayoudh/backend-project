import { Role } from '@/modules/auth/config/enum/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

@Prop({ required: true, unique: true })
username: string;
 
@Prop({ required: true, unique: true })
password: string;


@Prop({ required: false, unique: true })
idRNE: string;

@Prop({ required: true })
roles: Role[];

@Prop({ required: true }) 
lastName: string;

@Prop({ required: true }) 
firstName: string;

@Prop({ required: true }) 
phone: Number;

@Prop({ required: true }) 
email: string;

@Prop()
profilePicture: string; // This will store the path to the profile picture , + register 

@Prop({ required: true }) 
Entreprise: string;

@Prop({required: false, unique: true }) 
RIB: Number;

@Prop({ required: false, unique: true }) 
CNSSCode: Number;

@Prop({ required: false , unique: true }) 
FiscalityCode : string;

@Prop({ default: false })// Ajout du champ "archived" avec la valeur par défaut false
archived: boolean;

//lil update profile 
@Prop({required: false}) 
profileImage: String ; // Chemin de l'image de profil dans le système de fichiers local+updateProfile

}

export const UserSchema = SchemaFactory.createForClass(User);
  //static username: any;

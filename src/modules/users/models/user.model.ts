import { ObjectId } from "mongoose";

export interface IUser {
_id?: number;
idRNE?: string;
profilePicture : string ; 
 password: string;
 username: string;
 roles: string[]; 
 lastName: string;
 firstName: string;
 phone: Number ;
 email: string;
 Entreprise: string;
 profileImage: String ; // Chemin de l'image de profil dans le système de fichiers local
 RIB: Number ;
 CNSSCode: Number ;
 FiscalityCode : string;
 archived: boolean;


 
}

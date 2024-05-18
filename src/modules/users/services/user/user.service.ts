import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { IUser } from '../../models/user.model';
import { Role } from '@/modules/auth/config/enum/role.enum';
import { FileUploadService } from '../uploadProfilePicture.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User> , 
  private fileUploadService: FileUploadService // Injecter le service de téléchargement de fichiers

) {}

  async findOne(username: string): Promise<IUser> {
    return this.userModel.findOne({ username });
  }

  async findAllCompany(): Promise<IUser[]> {
    return this.userModel.find({roles:{$in:[Role.Company]}});
  }

  async create(requestData: IUser ,  profilePicture: Express.Multer.File): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(requestData.password, salt);
    const uploadedProfilePicture = await this.fileUploadService.uploadProfilePicture(profilePicture );
    const newRequestData = { ...requestData, password: hashedPassword  , profilePicture: uploadedProfilePicture};
    return this.userModel.create(newRequestData );
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }


  async updateProfile( data: any, profileId: string 
  //  , profilePicture: Express.Multer.File
  ): Promise<any> {
    // // Vérifiez si le fichier de photo de profil est fourni
    // if (profilePicture) {
    //   // Enregistrez la nouvelle photo de profil
    //   const profilePictureName = await this.fileUploadService.uploadProfilePicture(profilePicture);
    //   // Ajoutez le chemin de la nouvelle photo de profil aux données
    //   data.profilePicture = profilePictureName;
    // }
    // Check if the user provided a new password
  if (data.password) {
    // Hash the password before updating the user data
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Update the password field with the hashed password
    data.password = hashedPassword;
  }
        const existingProfile = await this.userModel.findById(profileId);
        if (!existingProfile) {
    
            throw new UnauthorizedException({
              statusCode: 500,
              message: 'Profile not found',
            });
        }
        
       return await this.userModel.findByIdAndUpdate(profileId, data,{new: true});
     
    }


  async archiveProfile(id: string): Promise<User> {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      
      if (user.archived) {
        throw new BadRequestException('The profile is already archived');
      }
  
      user.archived = true;
      await user.save();
  
      return user.save();
  
    }


  async unarchiveProfile(id: string): Promise<User> {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      // const profile = await this.profileModel.findById(user._id);
      // if (!profile) {
      //   throw new NotFoundException('Profile not found');
      // }
  
      if (!user.archived) {
        throw new BadRequestException('The user is not archived');
      }
  
      user.archived = false;
      await user.save();
  
      return user.save();
      // // Vérifier si l'utilisateur est déjà déarchivé
      // if (!user.profile.archived) {
      //   throw new BadRequestException('L\'utilisateur n\'est pas archivé');
      // }
    
      // // Déarchiver l'utilisateur en définissant la propriété "archived" à false
      // user.profile.archived = false;
    
      // // Enregistrer les modifications de l'utilisateur
      // return user.save();
    }
    

  async getArchivedProfiles(): Promise<User[]> {
      const archivedProfile = await this.userModel.find({ archived: true });
    return archivedProfile ; 

}

// async getArchivedProfiles(): Promise<User[]> {
//   const profiles = await this.profileModel.find({ archived: true });
//   const userIds = profiles.map((profile) => profile.userId);
//   return this.userModel.find({ _id: { $in: userIds } }).exec();
// }




//    // Vérifier si le profil est archivé
  // if (user.profile.archived) {
  //   // Le profil est déjà archivé, vous pouvez gérer cette situation dans votre application
  //   throw new BadRequestException('Le profil est déjà archivé');
  // }

  // // Archiver le profil en définissant la propriété "archived" à true
  // user.profile.archived = true;

  // // Enregistrer les modifications du profil
  // //await user.save();

  // // Enregistrer les modifications de l'utilisateur
  // return user.save();

}


// file-upload.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  async uploadProfilePicture(profilePicture: Express.Multer.File): Promise<string> {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExt = extname(profilePicture.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      throw new BadRequestException('Invalid file format. Only JPG, JPEG, or PNG files are allowed.');
    }

    const fileName = `${uuidv4()}${fileExt}`;
    const uploadDir = join(process.cwd(), 'upload', 'profile-pictures'); // Chemin du dossier de téléchargement

    // Vérifiez si le dossier de téléchargement existe, sinon, créez-le
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

     // Traitez le téléchargement de la photo de profil ici
     const uploadPath = join(uploadDir, fileName); // Utilisez join pour obtenir un chemin absolu

     await fs.promises.writeFile(uploadPath, profilePicture.buffer);
 
     return fileName;
  }
}

// file-upload.service.ts

// import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from '../schemas/user.schema';

// @Injectable()
// export class FileUploadService {
//   constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

//   async uploadProfilePicture(profilePicture: any ): Promise<void> {
//     const user = await this.userModel.findById(userId);

  

//     // Assurez-vous que le fichier est fourni
//     if (!profilePicture) {
//       throw new BadRequestException('No profile picture provided.');
//     }

//     // Traitez le téléchargement de la photo de profil ici
//     const profilePictureUrl = `/uploads/${profilePicture.filename}`; // Suppose que le fichier est enregistré dans un dossier "uploads"

//     // Enregistrez l'URL de la photo de profil dans l'utilisateur correspondant dans la base de données
//     user.profilePicture = profilePictureUrl;
//     await user.save();
//   }
// }


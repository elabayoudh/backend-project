import { IUser } from '@/modules/users/models/user.model';
import { User, UserDocument } from '@/modules/users/schemas/user.schema';
import { UserService } from '@/modules/users/services/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { omit } from 'lodash';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../config/enum/role.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileUploadService } from '@/modules/users/services/uploadProfilePicture.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private fileUploadService: FileUploadService ,// Injecter le service de téléchargement de fichiers

    @InjectModel(User.name) private userModel: Model<UserDocument>,


  ) {}

  async register(requestDate: IUser , profilePicture: Express.Multer.File ): Promise<User> {

  const user = await this.usersService.findOne(requestDate.username);
    if (!user) {
      return this.usersService.create(requestDate, profilePicture);
    }
    const isMatch = await bcrypt.compare(requestDate.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        statusCode: 500,
        message: 'passwordAlreadyInUse',
      });
    }
    if (user.username === requestDate.username) {
      throw new UnauthorizedException({
        statusCode: 500,
        message: 'usernameAlreadyInUse',
      });
    }
    return this.usersService.create(requestDate , profilePicture);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
        const result = omit(user, ['password']); //The omit function is used to exclude certain properties from an object. 
      //In your example, omit is used to exclude the password property from the user object.
     // result.profile = profile;

      return result;
    }
    return null;
  }


  async signIn(user: any) {
    delete user.password; //ne pas inclure le mot de passe dans le résultat final.
    //const profile = await this.profileService.findOne(user.profileId);

    const payload = {
      username: user.username,
      sub: user._id,
      roles: user.roles,
    };
    return {
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      phone: user.phone,
      email: user.email,
      roles: user.roles,
      Entreprise:user.Entreprise ,  
      sub: user._id ,  
      access_token: this.jwtService.sign(payload),
    };
  }

  
}

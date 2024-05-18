import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '@/modules/users/models/user.model';
import { LocalAuthGuard } from '../../config/guard/local-auth.guard';
import { UserService } from '@/modules/users/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../../config/decorator/roles.decorator';
import { Role } from '../../config/enum/role.enum';
import { JwtAuthGuard } from '../../config/guard/jwt-auth.guard';
import { RolesGuard } from '../../config/guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService , private jwtService: JwtService) {}

  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Post('register')
  @UseInterceptors(FileInterceptor('profilePicture')) // Utiliser un intercepteur pour gérer le fichier téléchargé
  signUp(@Body() requestData: IUser  , 
  @UploadedFile() profilePicture: Express.Multer.File // Récupérer le fichier téléchargé
) {
    return this.authService.register(requestData , profilePicture );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
  
  

  

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)//Cela signifie que le LocalAuthGuard sera utilisé pour protéger cette route, ce qui nécessite une authentification locale pour y accéder.
  // @Post('disconnect')
  // async disconnect(@Request() req) {
  //   const userId = req.user.sub; // Supposons que le champ 'sub' contient l'ID de l'utilisateur
  //   await this.authService.disconnect(userId);
  //   return { message: 'Déconnexion réussie' };
  // }

  

  
 

 
  
}

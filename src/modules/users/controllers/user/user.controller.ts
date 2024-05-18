import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from '@/modules/auth/config/guard/jwt-auth.guard';
import { Roles } from '@/modules/auth/config/decorator/roles.decorator';
import { Role } from '@/modules/auth/config/enum/role.enum';
import { RolesGuard } from '@/modules/auth/config/guard/roles.guard';
import { profile } from 'console';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('companies')
  async getAllUserCompany() {
    return await this.userService.findAllCompany();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin,Role.Company)
  @Patch(':id')
  //@UseInterceptors(FileInterceptor('profilePicture')) // Utilisez un intercepteur pour gérer le fichier téléchargé
  async updateUser(@Param('id') id: string, @Body() req: any ,  
  //@UploadedFile() profilePicture: Express.Multer.File
) {
    return await this.userService.updateProfile(req, id 
      //profilePicture
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/archive')
  @Roles(Role.Admin)
  async archiveUser(@Param('id') id: string) {
    return this.userService.archiveProfile(id);
  }

 

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/unarchive')
  @Roles(Role.Admin)
  async unarchiveUser(@Param('id') id: string) {
    return this.userService.unarchiveProfile(id);
  }

  // @Get(':username')
//   async findOne(@Param('username') username: string): Promise<IUser> {
//     return this.userService.findOne(username); 
//   }


 // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('recover')
  // @Roles(Role.Admin)
  // async getArchivedProfiles () {
  //   const archivedProfiles = await this.userService.getArchivedProfiles();
  //   return archivedProfiles;
  // }
}

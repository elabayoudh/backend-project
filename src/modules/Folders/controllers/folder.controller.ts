import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FolderService } from '../services/folder.service';
import { Folder } from '../schemas/folder.schema';
import { JwtAuthGuard } from '@/modules/auth/config/guard/jwt-auth.guard';
import { Role } from '@/modules/auth/config/enum/role.enum';
import { RolesGuard } from '@/modules/auth/config/guard/roles.guard';
import { Roles } from '@/modules/auth/config/decorator/roles.decorator';
import { IFolder } from '../models/folder.model';

@Controller('folders')
export class FolderController {

    constructor(private folderService: FolderService) {}

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(Role.Admin, Role.Company)
  //   @Post('createFolder')
  // async createFolder( @Body() { name, userId }: { name: string ; userId: string },)
  // : Promise<Folder> {
  //   return this.folderService.createFolder(name, userId);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Company)
    @Post('createFolder')
  async createFolder(@Body() requestData: IFolder )
  : Promise<Folder> {
    return this.folderService.createFolder(requestData);
  }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Company)
    @Get('AllFolders')
  async getAllFolders(): Promise<Folder[]> {
    return await this.folderService.getAllFolders();
  }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.Company)
    @Get('/:folderId')
    async getFolderById(@Param('folderId') folderId: string) {
      return this.folderService.getFolderById(folderId);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.Admin, Role.Company)
    // @Delete('removeFilefromFolder/:folderId/files/:fileId')
    // async removeFileFromFolder(@Param('folderId') folderId: string, @Param('fileId') fileId: string) {
    //   await this.folderService.removeFileFromFolder(folderId, fileId);
    //   return { message: 'Fichier supprimé avec succès' };
    // }



    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.Admin, Role.Company)
    // @Post('addFiletoFolder/:folderId/files')
    // async addFileToFolder(@Param('folderId') folderId: string, @Body() { fileId }: { fileId: string }) {
    //   await this.folderService.addFileToFolder(folderId, fileId);
    //   return { message: 'Fichier ajouté avec succès' };
    // }


}

    

    

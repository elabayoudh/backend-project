import {
  Body,
  Controller,Delete,Get,Param,Post,
  StreamableFile, UnauthorizedException, UploadedFiles,UseGuards,UseInterceptors, } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from '../Service/fileService';
import { IFile } from '../model/files.model';
import { join } from 'path';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from '@/modules/auth/config/guard/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/config/guard/roles.guard';
import { Roles } from '@/modules/auth/config/decorator/roles.decorator';
import { Role } from '@/modules/auth/config/enum/role.enum';
import { FileDocument } from '../schemas/file.schema';

@Controller('file')
export class UploadFileController {
  constructor(private fileService: FileService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('UploadFile')
  @Roles(Role.Admin, Role.Company)
  @UseInterceptors(
    FilesInterceptor('files', 1000, {
      fileFilter: (req, file, callback) => {
        if (file.mimetype === 'application/pdf') {
          callback(null, true);
        } else {
          callback(
            new UnauthorizedException({
              statusCode: 500,
              message: 'onlyPdfFilesAreAllowed!',
            }),
            false,
          );
        }
      },
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() requestData: { 
      userId: string ; 
      FolderID:string ;
      username : string 
  },
  )
  
  {
    // Your service call to upload files
    return await this.fileService.uploadFiles(
      files,
      requestData.userId,
      requestData.FolderID,
      requestData.username , 
    );
  }

 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Company)
  @Get('allfiles')
  async getAllFiles(): Promise<IFile[]> {
    return this.fileService.getAllFiles();
  }



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Company)
  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    await this.fileService.deleteFile(fileId);
    return { message: 'File  deleted successfully' };
  }


  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get(':filename')
  // @Roles(Role.Admin, Role.Company)
  // serveFile(@Param('filename') filename: string) {
  //   const file = createReadStream(join(process.cwd(), 'upload', filename));
  //   return new StreamableFile(file);
  // }

 

 

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Company)
  // @Get('/listOFfiles')
  // async getAllFiles(): Promise<FileDocument[]> {
  //   return this.fileService.getAllFiles();
  // }



   // // // async uploadFiles(
  // // //   @UploadedFiles() files: Array<Express.Multer.File>,
  // // //   @Body() requestData: IFile,
  // // // ) 
  
  


  

  


}

import { Roles } from "@/modules/auth/config/decorator/roles.decorator";
import { Role } from "@/modules/auth/config/enum/role.enum";
import { JwtAuthGuard } from "@/modules/auth/config/guard/jwt-auth.guard";
import { RolesGuard } from "@/modules/auth/config/guard/roles.guard";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PublicationService } from "../services/publication.service";
import { IPublication } from "../model/publication.model";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('publication')
export class PublicationController {
  constructor(private publicationService: PublicationService) {}


  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('createPub')
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  async createPub(@Body() req: IPublication , @UploadedFile()file : Express.Multer.File) {
    req.file = file ; 
    return await this.publicationService.create(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cherchePub')
  async getAllPublication() {
    return await this.publicationService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPublicationById(@Param('id') id: string) {
    return await this.publicationService.findPublicationById(id);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deletePublication(@Param('id') id: string) {
    return await this.publicationService.deletePublication(id);
  }
} 
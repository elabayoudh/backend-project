// import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
// import { ApiTags, ApiResponse } from '@nestjs/swagger';
// import { JwtAuthGuard } from '../../auth/config/guard/jwt-auth.guard';
// import { CreateChatDto } from '../DTOS/chat.dtos';
// import { ChatsService } from '../services/chat.service';
// import { RolesGuard } from '@/modules/auth/config/guard/roles.guard';
// import { Roles } from '@/modules/auth/config/decorator/roles.decorator';
// import { Role } from '@/modules/auth/config/enum/role.enum';

// @ApiTags('chats')
// @Controller('chats')
// export class ChatsController {
//   constructor(private readonly chatsService: ChatsService) {}

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(Role.Admin)  
//   @Post('create-chat')
//   @ApiResponse({
//     status: 201,
//     description: 'The chat has been successfully created.',
//   })
//   async createChat(@Body() createChatDto: CreateChatDto) {
//     return await this.chatsService.createChat(createChatDto);
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(Role.Admin , Role.Company) 
//   @UseGuards(JwtAuthGuard)
//   @Get('allchats/:id')
//   async getAllChatsByUserId(@Param(':id') id: string)
//   {
//     return await this.chatsService.findAllChats(id);
//   }
// }
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/config/guard/jwt-auth.guard';
import { CreateChatDto } from '../DTOs/chat.dtos';
import { ChatsService } from '../services/chat.service';
import { RolesGuard } from '@/modules/auth/config/guard/roles.guard';
import { Roles } from '@/modules/auth/config/decorator/roles.decorator';
import { Role } from '@/modules/auth/config/enum/role.enum';

@ApiTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)  
  @Post('create-chat')
  @ApiResponse({
    status: 201,
    description: 'The chat has been successfully created.',
  })
  async createChat(@Body() createChatDto: CreateChatDto) {
    return await this.chatsService.createChat(createChatDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin , Role.Company) 
  @UseGuards(JwtAuthGuard)
  @Get('allchats/:userId') // Utilisez le paramètre userId pour obtenir les chats de l'utilisateur
  async getAllChatsByUserId(@Param('userId') userId: string)
  {
    return await this.chatsService.findAllChats(userId);
  }
}


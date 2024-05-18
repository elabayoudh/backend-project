// import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
// import { ApiTags, ApiResponse } from '@nestjs/swagger';
// import { JwtAuthGuard } from '@/modules/auth/config/guard/jwt-auth.guard';
// import { MessagesService } from '../services/message.service';
// import { CreateMessageDto } from '../DTOS/message.dto';
// import { RolesGuard } from '@/modules/auth/config/guard/roles.guard';
// import { Roles } from '@/modules/auth/config/decorator/roles.decorator';
// import { Role } from '@/modules/auth/config/enum/role.enum';


// @ApiTags('messages')
// @Controller('messages')
// export class MessagesController {
//   constructor(private readonly messagesService: MessagesService) {}

//   @UseGuards(JwtAuthGuard)
//   @Post('create-message')
//   @ApiResponse({
//     status: 201,
//     description: 'The message has been successfully created.',
//   })
//   async createMessage(@Body() createMessageDto: CreateMessageDto) {
//     return await this.messagesService.createMessage(createMessageDto);
//   }

  
  
//   @UseGuards(JwtAuthGuard)
//   @Get('user/:userId') //t7ot id el user eli t7eb tchof chno b34 messagat 
//   async getAllMessagesForUser(@Param('userId') userId: string) {
//     return await this.messagesService.findAllMessages(userId);
//   }

// }
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/config/guard/jwt-auth.guard';
import { MessagesService } from '../services/message.service';
import { CreateMessageDto } from '../DTOs/message.dto';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':chatId/create-message') // Ajoutez le paramètre chatId dans l'URL
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
  })
  async createMessage(@Param('chatId') chatId: string, @Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.createMessage(chatId, createMessageDto); // Utilisez le chatId
  }

  @UseGuards(JwtAuthGuard)
  @Get(':chatId/all-messages') // Ajoutez le paramètre chatId dans l'URL
  async getAllMessagesForChat(@Param('chatId') chatId: string) {
    return await this.messagesService.findAllMessages(chatId); // Utilisez le chatId
  }
}


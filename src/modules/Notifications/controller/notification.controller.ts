import { Controller, Post, Body, UseGuards, HttpStatus, HttpCode, Get, Param, BadRequestException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../Dtos/create-notification.dto';
import { JwtAuthGuard } from '@/modules/auth/config/guard/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/config/guard/roles.guard';
import { Roles } from '@/modules/auth/config/decorator/roles.decorator';
import { Role } from '@/modules/auth/config/enum/role.enum';
import { JwtService } from '@nestjs/jwt';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService:NotificationService , private jwtService: JwtService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('create-notif')
  // @ApiResponse({
  //   status: 201,
  //   description: 'The notif has been successfully created.',
  // })
  // async createNotif(@Body() createNotificationDto: CreateNotificationDto) {
  //   return await this.notificationService.create(createNotificationDto);
  // }
  @ApiResponse({
    status: 201,
    description: 'The notif has been successfully created.',
  })
  async createNotif(@Body() createNotificationDto: CreateNotificationDto) {
    if (createNotificationDto.reminder) {
      // Validate the reminder fields (e.g., sendAt)
      if (!createNotificationDto.sendAt) {
        throw new BadRequestException('SendAt is required for reminders');
      }
    } else {
      // Validate the custom notification fields (e.g., customContent, sendAt)
      if (!createNotificationDto.customContent ||!createNotificationDto.sendAt) {
        throw new BadRequestException('CustomContent and SendAt are required for custom notifications');
      }
    }

    return await this.notificationService.create(createNotificationDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('Notif')  
  async getALLNotifications(): Promise<Notification[]> {
    return await this.notificationService.getAllNotifications();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('MyNotif')
  // async getNotification(@Param('currentUserId') currentUserId: string): Promise<Notification[]> {
  //   return await this.notificationService.getNotification(currentUserId);
  // }

 
 

}

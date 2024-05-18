
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationGateway } from '../notification.gateway';
import { ObjectId } from 'mongodb';
import { CronJob } from 'cron';
import { CreateNotificationDto } from '../Dtos/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
    private notifGateway: NotificationGateway) {}

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
      const createdNotification = new this.notificationModel({
        body: createNotificationDto.body,
        title: createNotificationDto.title,
        username: createNotificationDto.username,
        sender_id: createNotificationDto.sender_id,
        receiver_id: createNotificationDto.receiver_id,
        reminder: createNotificationDto.reminder,
        customContent: createNotificationDto.customContent,
        sendAt: createNotificationDto.sendAt,
      });
    
      if (createNotificationDto.reminder) {
        // Create a cron job to send the reminder notification at the specified time
        const job = new CronJob(createNotificationDto.sendAt, () => {
          this.notifGateway.createNotification(createdNotification);
        });
      //   job.start();
      // } else {
      //   // Calculate the delay in milliseconds until the specified send time
      //   const delay = createdNotification.sendAt.getTime() - new Date().getTime();
    
      //   // Send the custom notification at the specified time
      //   setTimeout(() => {
      //   this.notifGateway.createNotification(createdNotification);
      //   }, delay);
      }
    
      const result = await createdNotification.save();
      return result;
    }



  async getAllNotifications(): Promise<Notification[]> {
    return await this.notificationModel.find().sort({ createdAt: -1 });
  }
}



// import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { CreateNotificationDto } from '../Dtos/create-notification.dto';
// import { NotificationGateway } from '../notification.gateway';
// import { ObjectId } from 'mongodb';
// import { InjectModel } from '@nestjs/mongoose';

// @Injectable()
// export class NotificationService {
//   constructor(
//     @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
//     private notifGateway: NotificationGateway) {}
    

//   async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
//     const createdNotification = new this.notificationModel({
//         body: createNotificationDto.body,
//         title : createNotificationDto.title ,
//         username  : createNotificationDto.username ,
//         sender_id: createNotificationDto.sender_id,
//         receiver_id: createNotificationDto.receiver_id , //  coté web lazemni 
//     });
//     const result = await createdNotification.save();
//     this.notifGateway.createNotification(result);
//     return result;
//   }

 

//   // Add this method to fetch notifications
//   async getAllNotifications(): Promise<Notification[]> {
//     return await this.notificationModel.find().sort({ createdAt: -1 });
//   }



  
//   //This will return only the notifications where receiver_id is equal to the current user's Id
  
//   // async getNotification(currentUserId: string): Promise<Notification[]> {
//   //   return await this.notificationModel.find({ receiver_id: currentUserId }).sort({ createdAt: -1 });
//   // }

//   // async getNotification(currentUserId: string): Promise<Notification[]> {
//   //   console.log(`id: ${currentUserId}`);
//   //   const notifications = await this.notificationModel.find({ receiver_id: currentUserId } , { createdAt: 1 }).sort({ createdAt: -1 });
//   // console.log(`notifications: ${notifications}`);
//   // return notifications;

//   //     //return await this.notificationModel.find({ receiver_id: id }).sort({ createdAt: -1 });

//   // }

// }



//  // async findAll(): Promise<Notification[]> {
//   //   return await this.notificationModel.find();
//   // }



// // import { Injectable } from '@nestjs/common';
// // import { Notification } from '../model/notification.model';

// // @Injectable()
// // export class NotificationsService {
// //   private notifications: Notification[] = [];

// //   createNotification(notification: Notification): void {
// //     this.notifications.push(notification);
// //   }

// //   sendNotifications(): void {
// //     this.notifications = this.notifications.filter(
// //       (notification) => notification.sentAt === null,
// //     );

// //     this.notifications.forEach((notification) => {
// //       // Send notification here
// //       console.log(
// //         `Sending notification to ${notification.recipient}: ${notification.title}`,
// //       );

// //       // Mark notification as sent
// //       notification.sentAt = new Date();
// //     });
// //   }

// //   getNotificationsForRecipient(recipient: 'company' | 'admin'): Notification[] {
// //     return this.notifications.filter((notification) => notification.recipient === recipient);
// //   }
// // }
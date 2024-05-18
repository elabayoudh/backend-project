import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './services/notification.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './controller/notification.controller';
import { NotificationSchema } from './schema/notification.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
    JwtModule.register({
      secret: 'your-jwt-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService,NotificationGateway],
  exports: [NotificationService],
})
export class NotificationModule {}

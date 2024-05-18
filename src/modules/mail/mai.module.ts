import { Module } from '@nestjs/common';
import { MailService } from './mailerService.service';
@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mailerService.service';
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-password-reset-email')
  async sendPasswordResetEmail(@Body() body: { email: string; token: string }) {
    const { email, token } = body;
    await this.mailService.sendPasswordResetEmail(email, token);
    return { message: 'Password reset email sent successfully' };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      secure: true,
      host: 'smpt.gmail.com',
      auth: {
        user: this.config.get<string>('EMAIL'),
        pass: this.config.get<string>('PASSWORD'),
      },
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: this.config.get<string>('EMAIL'),
        to: email,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: http://localhost:3000/reset-password?token=${token}`,
        html: `<p>Click the following link to reset your password:</p><p><a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a></p>`,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}

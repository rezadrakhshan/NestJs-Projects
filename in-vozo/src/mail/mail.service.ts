import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_ADDRESS'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }
  async sendMail(to: string, subject: string, html?: string) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_ADDRESS'),
      to,
      subject,
      html,
    };
    return this.transporter.sendMail(mailOptions);
  }
}

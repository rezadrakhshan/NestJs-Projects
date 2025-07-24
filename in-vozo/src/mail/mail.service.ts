import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env['EMAIL_ADDRESS'],
        pass: process.env['EMAIL_PASSWORD'],
      },
    });
  }
  async sendMail(to: string, subject: string, html?: string) {
    const mailOptions = {
      from: process.env['EMAIL_ADDRESS'],
      to,
      subject,
      html,
    };
    return this.transporter.sendMail(mailOptions);
  }
}

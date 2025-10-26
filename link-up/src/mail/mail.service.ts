import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(to: string, code: string) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject: 'Confirm code',
      text: code,
    };
    return this.transporter.sendMail(mailOptions);
  }
}

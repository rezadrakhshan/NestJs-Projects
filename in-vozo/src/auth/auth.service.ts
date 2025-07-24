import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Code } from './schemas/verifyCode';
import { MailService } from '@app/mail/mail.service';
import { pick } from 'lodash';
import { getVerifyCodeTemplate } from '@app/templates/send-code';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Code.name) private codeModel: Model<Code>,
    private readonly mailService: MailService,
  ) {}

  async sendCode(data) {
    const { email, type } = pick(data, ['email', 'type']);
    const code = Math.floor(1000 + Math.random() * 9000)
      .toString()
      .padStart(4, '0');
    const html = getVerifyCodeTemplate(email, code, type);
    await this.codeModel.create({
      email,
      code,
      expireAt: new Date(Date.now() + 1 * 60 * 1000),
    });
    await this.mailService.sendMail(email, 'Verify Code', html);
  }
}
